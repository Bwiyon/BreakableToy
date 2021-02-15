import express from "express";
import SavedFlight from "../../../models/SavedFlight.js";
import { ValidationError } from "objection";

const savedFlightsRouter = new express.Router();

savedFlightsRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const savedTrip = await SavedFlight.query().insertAndFetch(body);
    return res.status(201).json({ trip: savedTrip });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default savedFlightsRouter;
