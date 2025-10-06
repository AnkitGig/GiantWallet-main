import { Router } from "express";
import userRouter from "../routes/user.routes.js";
import paymentRouter from "./payment.routes.js";
import adminRouter from "./admin.routes.js";
import goggleAuthRouter from "./googleAuth.routes.js";
import notificationRouter from "./notification.routes.js";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/payment", paymentRouter)
rootRouter.use("/admin", adminRouter)
rootRouter.use("/google-auth", goggleAuthRouter)
rootRouter.use("/notification", notificationRouter)


export default rootRouter;
