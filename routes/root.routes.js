import { Router } from "express";
import userRouter from "../routes/user.routes.js";
import paymentRouter from "./payment.routes.js";
import adminRouter from "../routes/admin.routes.js";
import goggleAuthRouter from "../routes/googleAuth.routes.js";
import networkRouter from "../routes/network.routes.js";
import tokenRouter from "./token.routes.js";   

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/payment", paymentRouter);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/google-auth", goggleAuthRouter);
rootRouter.use("/network", networkRouter);
rootRouter.use("/token", tokenRouter)

export default rootRouter;
