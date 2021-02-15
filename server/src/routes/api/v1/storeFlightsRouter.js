import express from "express";
import Flight from "../../../models/Flight.js";
import { ValidationError } from "objection";

const storeFlightsRouter = new express.Router();

storeFlightsRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const newTrip = await Flight.query().insertAndFetch(body);
    return res.status(201).json({ trip: newTrip });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default storeFlightsRouter;
