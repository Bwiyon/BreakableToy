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

storeFlightsRouter.delete("/", async (req, res) => {
  const body = req.body.info;
  try {
    for (let id of body) {
      await Flight.query().deleteById(parseInt(id.flightID));
    }
    return res.status(200).json({ body });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

storeFlightsRouter.delete("/:id", async (req, res) => {
  const id = req.body.id;
  try {
    await Flight.query().deleteById(id);
    return res.status(200).json({ body });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});
export default storeFlightsRouter;
