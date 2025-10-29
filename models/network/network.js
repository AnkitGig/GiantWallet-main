import mongoose from "mongoose";

const nativeCurrencySchema = new mongoose.Schema(
  {
    name: { type: String },
    symbol: { type: String },
    decimals: { type: Number, default: 18 },
  },
  { _id: false }
);

const networkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional for default networks
    },
    name: { type: String, required: true },
    chainId: { type: Number, required: true },
    chainIdHex: { type: String },
    rpcUrl: { type: String, required: true },
    nativeCurrency: { type: nativeCurrencySchema, default: {} },
    blockExplorerUrl: { type: String, default: null },
    symbol: { type: String, default: null },
    icon: { type: String, default: null },
    isCustom: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false }, // ✅ added
    tags: [{ type: String }],
  },
  { timestamps: true }
);


// ensure a user can't add the same chainId twice
networkSchema.index({ userId: 1, chainId: 1 }, { unique: true, sparse: true });

// populate chainIdHex (e.g. 1 -> 0x1)
networkSchema.pre("save", function (next) {
  try {
    if (this.chainId && !this.chainIdHex) {
      // convert number to hex string prefixed with 0x
      this.chainIdHex = `0x${this.chainId.toString(16)}`;
    }
  } catch (err) {
    // ignore and continue
  }
  next();
});

export const Network = mongoose.model("Network", networkSchema);
