import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    title: {
      type: String,
      required: true, 
    },
    message: {
      type: String,
      required: true, 
    },
    type: {
      type: String,
      enum: ["system", "campaign", "foundation", "event", "custom", "buy", "sell"], 
      default: "custom", 
    },
    data: {
      type: Object, 
      default: {},
    },
    isRead: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
  
);

export const Notification = mongoose.model("Notification", notificationSchema);