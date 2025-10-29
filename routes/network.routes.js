import { Router } from "express";
import {
  addNetworkHandle,
  listNetworksHandle,
  deleteNetworkHandle,
  updateNetworkHandle,
} from "../controllers/network.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/", auth, addNetworkHandle);
router.get("/", auth, listNetworksHandle);
router.delete("/", auth, deleteNetworkHandle);
router.patch("/", auth, updateNetworkHandle);

export default router;
