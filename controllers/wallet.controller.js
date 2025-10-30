import { ethers } from "ethers";
import { ApiResponse } from "../utils/ApiReponse.js";
import Joi from "joi";

export const createWalletController = async (req, res) => {
  try {
    const wallet = ethers.Wallet.createRandom();
    const walletDetails = {
      address: wallet.address,
      mnemonic: wallet.mnemonic?.phrase,
      privateKey: wallet.privateKey,
    };

    console.log(`wallet created ------>`, wallet);

    return res
      .status(200)
      .json(new ApiResponse(200, walletDetails, "Wallet Created Successfully"));
  } catch (error) {
    console.error(`Error while creating wallet:`, error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, `Internal Server Error`));
  }
};

export const importWalletController = async (req, res) => {
  try {
    const { mnemonic } = req.body;
    const schema = Joi.object({
      mnemonic: Joi.string().trim().required().messages({
        "string.empty": "Mnemonic phrase is required",
        "any.required": "Mnemonic phrase is required",
        "string.base": "Mnemonic must be a valid string",
      }),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json(new ApiResponse(400, {}, error.details[0].message));

    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    const walletDetails = {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };

    return res
      .status(200)
      .json(
        new ApiResponse(200, walletDetails, `Wallet Imported Successfully`)
      );
  } catch (error) {
    console.error(`Error while importing wallet:`, error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, `Internal Server Error`));
  }
};

export const walletBalanceController = async (req, res) => {
  try {
    const { address, rpcUrl } = req.body;
    const schema = Joi.object({
      address: Joi.string().required(),
        rpcUrl: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json(new ApiResponse(400, {}, error.details[0].message));

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const balance = await provider.getBalance(address);

    // console.log(`Balance of ${address}:`, ethers.formatEther(balance), "ETH");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { balance: ethers.formatEther(balance) },
          `Wallet Balance Fetched Successfully`
        )
      );


  } catch (error) {
    console.error(`Error while getting balance of wallet:`, error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, `Internal Server Error`));
  }
};
