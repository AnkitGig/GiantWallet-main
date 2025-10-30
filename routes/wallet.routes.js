import { Router } from "express";
import {
  createWalletController,
  importWalletController,
  walletBalanceController
} from "../controllers/wallet.controller.js";

const walletRouter = Router();

walletRouter.post("/create", createWalletController);
walletRouter.post("/import", importWalletController);
walletRouter.get("/balance", walletBalanceController);

export default walletRouter;
