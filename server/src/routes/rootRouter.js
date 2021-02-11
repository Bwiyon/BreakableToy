import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import airportsRouter from "./api/v1/airportsRouter.js";
import flightsRouter from "./api/v1/flightsRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/airports", airportsRouter);
rootRouter.use("/api/v1/flights", flightsRouter);

export default rootRouter;
