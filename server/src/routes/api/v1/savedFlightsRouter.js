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

savedFlightsRouter.delete("/", async (req, res) => {
  const id = req.body.id;

  try {
    const gatherFlightId = await SavedFlight.query().where({ tripID: id });
    const savedTrip = await SavedFlight.query().delete().where({ tripID: id });
    return res.status(201).json({ trip: gatherFlightId });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});
export default savedFlightsRouter;
