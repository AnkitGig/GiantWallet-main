import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { notificationSeenHandle } from "../controllers/notification.controller.js";

const notificationRouter = Router();

notificationRouter.patch("/:id/read", auth, notificationSeenHandle);

export default notificationRouter;
