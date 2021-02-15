import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import airportsRouter from "./api/v1/airportsRouter.js";
import flightsRouter from "./api/v1/flightsRouter.js";
import tripsRouter from "./api/v1/tripsRouter.js";
import savedFlightsRouter from "./api/v1/savedFlightsRouter.js";
import storeFlightsRouter from "./api/v1/storeFlightsRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/airports", airportsRouter);
rootRouter.use("/api/v1/flights", flightsRouter);
rootRouter.use("/api/v1/trips", tripsRouter);
rootRouter.use("/api/v1/savedFlights", savedFlightsRouter);
rootRouter.use("/api/v1/storeFlights", storeFlightsRouter);

export default rootRouter;
