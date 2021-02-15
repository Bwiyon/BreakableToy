import express from "express";
import Trip from "../../../models/Trip.js";
import { ValidationError } from "objection";

const tripsRouter = new express.Router();

tripsRouter.get("/", async (req, res) => {
  const ID = req.user.id;
  debugger;
  try {
    const rawTrip = await Trip.query().where({ userID: ID });
    debugger;
    return res.status(200).json({ rawTrip });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

tripsRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const newTrip = await Trip.query().insertAndFetch(body);
    return res.status(201).json({ trip: newTrip });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default tripsRouter;
