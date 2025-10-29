import Joi from "joi";
import { ApiResponse } from "../utils/ApiReponse.js";
import { Network } from "../models/network/network.js";

const addNetworkSchema = Joi.object({
  name: Joi.string().required(),
  chainId: Joi.alternatives().try(Joi.number().integer(), Joi.string().pattern(/^0x[0-9a-fA-F]+$|^\d+$/)).required(),
  rpcUrl: Joi.string().uri().required(),
  nativeCurrency: Joi.object({
    name: Joi.string().optional(),
    symbol: Joi.string().pattern(/^[A-Za-z0-9]{1,8}$/).optional(),
    decimals: Joi.number().integer().min(0).optional(),
  }).optional(),
  blockExplorerUrl: Joi.string().uri().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const updateNetworkSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().optional(),
  rpcUrl: Joi.string().uri().optional(),
  blockExplorerUrl: Joi.string().uri().optional(),
  chainId: Joi.alternatives().try(Joi.number().integer(), Joi.string().pattern(/^0x[0-9a-fA-F]+$|^\d+$/)).optional(),
  nativeCurrency: Joi.object({
    name: Joi.string().optional(),
    symbol: Joi.string().pattern(/^[A-Za-z0-9]{1,8}$/).optional(),
    decimals: Joi.number().integer().min(0).optional(),
  }).optional(),
  isActive: Joi.boolean().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const idQuerySchema = Joi.object({ id: Joi.string().required() });

async function getFetch() {
  if (globalThis.fetch) return globalThis.fetch;
  const mod = await import("node-fetch");
  return mod.default || mod;
}

function parseChainId(raw) {
  if (typeof raw === "number") return raw;
  if (typeof raw !== "string") return NaN;
  raw = raw.trim();
  if (/^0x/i.test(raw)) return parseInt(raw, 16);
  return parseInt(raw, 10);
}

async function verifyRpcChainId(rpcUrl, expectedChainId, timeoutMs = 5000) {
  if (!/^https?:\/\//i.test(rpcUrl)) {
    throw new Error("rpcUrl must start with http:// or https://");
  }

  const fetchFn = await getFetch();

  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const signal = controller ? controller.signal : undefined;
  if (controller) setTimeout(() => controller.abort(), timeoutMs);

  const body = { jsonrpc: "2.0", id: 1, method: "eth_chainId", params: [] };

  let res;
  try {
    res = await fetchFn(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    throw new Error(`Unable to reach RPC: ${err.message || err}`);
  }

  if (!res || !res.ok) throw new Error(`RPC responded with status ${res ? res.status : "(no response)"}`);

  const data = await res.json();
  const rpcChainIdRaw = data?.result ?? data?.chainId;
  if (typeof rpcChainIdRaw === "undefined") throw new Error("Invalid RPC response: missing chainId");

  const rpcChainId = parseChainId(rpcChainIdRaw);
  const expected = parseChainId(expectedChainId);
  if (Number.isNaN(rpcChainId) || Number.isNaN(expected)) throw new Error("Unable to parse chainId from RPC or provided value");

  return rpcChainId === expected;
}

export const addNetworkHandle = async (req, res) => {
  try {
    const userId = req.user.id;
    const payload = req.body;

    const { error } = addNetworkSchema.validate(payload);
    if (error) return res.status(400).json(new ApiResponse(400, {}, error.details[0].message));

    const { name, chainId, rpcUrl, nativeCurrency, blockExplorerUrl, tags } = payload;

    // Validate RPC chainId
    try {
      const ok = await verifyRpcChainId(rpcUrl, chainId);
      if (!ok) return res.status(400).json(new ApiResponse(400, {}, `rpcUrl chainId does not match provided chainId`));
    } catch (err) {
      console.error("RPC validation failed:", err.message || err);
      return res.status(400).json(new ApiResponse(400, {}, `Failed to validate rpcUrl: ${err.message || err}`));
    }

    const exists = await Network.findOne({ userId, chainId });
    if (exists) return res.status(400).json(new ApiResponse(400, {}, `Network with chainId already exists`));

    const normalizedSymbol = nativeCurrency?.symbol ? String(nativeCurrency.symbol).toUpperCase() : undefined;
    const storedNative = nativeCurrency ? { ...nativeCurrency } : {};
    if (normalizedSymbol) storedNative.symbol = normalizedSymbol;

    const network = await Network.create({
      userId,
      name,
      chainId,
      rpcUrl,
      nativeCurrency: storedNative,
      blockExplorerUrl: blockExplorerUrl || null,
      tags: tags || [],
      symbol: normalizedSymbol || null,
    });

    return res.status(201).json(new ApiResponse(201, network, `Network added successfully`));
  } catch (error) {
    console.error("Error in addNetworkHandle:", error);
    return res.status(500).json(new ApiResponse(500, {}, `Internal server error`));
  }
};

export const listNetworksHandle = async (req, res) => {
  try {
    const userId = req.user.id;

    
    const networks = await Network.find({
      $or: [
        { isCustom: false },       
        { userId: userId },        
      ],
      isActive: true,               
    }).sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, networks, "Networks fetched successfully"));
  } catch (error) {
    console.error("Error in listNetworksHandle:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Internal server error"));
  }
};


export const deleteNetworkHandle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.query;

    const { error } = idQuerySchema.validate({ id });
    if (error) return res.status(400).json(new ApiResponse(400, {}, error.details[0].message));

    const network = await Network.findOne({ _id: id, userId });
    if (!network) return res.status(404).json(new ApiResponse(404, {}, `Network not found`));

    await network.deleteOne();
    return res.status(200).json(new ApiResponse(200, {}, `Network deleted successfully`));
  } catch (error) {
    console.error("Error in deleteNetworkHandle:", error);
    return res.status(500).json(new ApiResponse(500, {}, `Internal server error`));
  }
};

export const updateNetworkHandle = async (req, res) => {
  try {
    const userId = req.user.id;
    const payload = req.body;

    const { error } = updateNetworkSchema.validate(payload);
    if (error) return res.status(400).json(new ApiResponse(400, {}, error.details[0].message));

    const { id, name, rpcUrl, blockExplorerUrl, nativeCurrency, isActive, tags, chainId } = payload;

    const network = await Network.findOne({ _id: id, userId });
    if (!network) return res.status(404).json(new ApiResponse(404, {}, `Network not found`));

    const newRpc = rpcUrl || network.rpcUrl;
    const newChainId = typeof chainId !== "undefined" ? chainId : network.chainId;

    const rpcChanged = rpcUrl && rpcUrl !== network.rpcUrl;
    const chainChanged = typeof chainId !== "undefined" && chainId !== network.chainId;

    if (rpcChanged || chainChanged) {
      try {
        const ok = await verifyRpcChainId(newRpc, newChainId);
        if (!ok) return res.status(400).json(new ApiResponse(400, {}, `rpcUrl chainId does not match provided chainId`));
      } catch (err) {
        console.error("RPC validation failed:", err.message || err);
        return res.status(400).json(new ApiResponse(400, {}, `Failed to validate rpcUrl: ${err.message || err}`));
      }
    }

    if (name) network.name = name;
    if (rpcUrl) network.rpcUrl = rpcUrl;
    if (typeof chainId !== "undefined") network.chainId = chainId;
    if (blockExplorerUrl) network.blockExplorerUrl = blockExplorerUrl;
    if (nativeCurrency) {
      const normalizedSymbol = nativeCurrency?.symbol ? String(nativeCurrency.symbol).toUpperCase() : undefined;
      network.nativeCurrency = { ...nativeCurrency };
      if (normalizedSymbol) network.nativeCurrency.symbol = normalizedSymbol;
      if (normalizedSymbol) network.symbol = normalizedSymbol;
    }
    if (typeof isActive === "boolean") network.isActive = isActive;
    if (tags) network.tags = tags;

    await network.save();
    return res.status(200).json(new ApiResponse(200, network, `Network updated successfully`));
  } catch (error) {
    console.error("Error in updateNetworkHandle:", error);
    return res.status(500).json(new ApiResponse(500, {}, `Internal server error`));
  }
};
