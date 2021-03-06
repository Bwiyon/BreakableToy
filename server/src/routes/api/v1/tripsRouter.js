import express from "express";
import Trip from "../../../models/Trip.js";
import { ValidationError } from "objection";
// import cleanUserInput from "../../../services/cleanUserInput.js";

const tripsRouter = new express.Router();

tripsRouter.get("/", async (req, res) => {
  const ID = req.user.id;
  try {
    const rawTrip = await Trip.query().where({ userID: ID });
    return res.status(200).json({ rawTrip });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

tripsRouter.post("/", async (req, res) => {
  const body = req.body;
  // const cleanBody = cleanUserInput(body);
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

tripsRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedTrip = await Trip.query().updateAndFetchById(parseInt(id), body);
    return res.status(200).json({ trip: updatedTrip });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

tripsRouter.delete("/", async (req, res) => {
  const id = parseInt(req.body.id);
  try {
    const removed = await Trip.query().deleteById(id);
    return res.status(204).json({ message: "The trip has been deleted!" });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default tripsRouter;
