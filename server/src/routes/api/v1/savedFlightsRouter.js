import express from "express";
import SavedFlight from "../../../models/SavedFlight.js";
import Flight from "../../../models/Flight.js";
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

savedFlightsRouter.delete("/:id", async (req, res) => {
  const id = req.body.id;

  try {
    const savedTrip = await SavedFlight.query().delete().where({ flightID: id });
    return res.status(201).json({ trip: gatherFlightId });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

savedFlightsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const gatherFlightId = await SavedFlight.query().where({ tripID: id });
    const flightArray = gatherFlightId.map((flight) => {
      return flight.flightID;
    });
    const flights = await Flight.query().findByIds(flightArray);
    return res.status(201).json({ flights: flights });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

savedFlightsRouter.get("/", async (req, res) => {
  try {
    let departure;
    let arrival;
    const gatherArrival = await SavedFlight.query().where({ arrival: true });
    if (gatherArrival.length === 0) {
      arrival = [];
    } else {
      arrival = await Flight.query().findById(gatherArrival[0].flightID);
    }
    const gatherDeparture = await SavedFlight.query().where({ departure: true });
    if (gatherDeparture.length === 0) {
      departure = [];
    } else {
      departure = await Flight.query().findById(gatherDeparture[0].flightID);
    }
    return res.status(201).json({ arrival, departure });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

savedFlightsRouter.patch("/", async (req, res) => {
  const id = req.body.id;
  try {
    const gatherFlights = await SavedFlight.query();
    for (let flight of gatherFlights) {
      if (flight.arrival === true) {
        await SavedFlight.query().updateAndFetchById(flight.id, { arrival: false });
      }
    }
    const makeArrivalTrue = await SavedFlight.query()
      .patch({ arrival: true, departure: false })
      .where({ flightID: id });
    const arrivalFlight = await SavedFlight.query().where({ flightID: id });
    return res.status(201).json({ arrival: arrivalFlight });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

savedFlightsRouter.patch("/:id", async (req, res) => {
  const id = req.body.id;
  try {
    const gatherFlights = await SavedFlight.query();
    for (let flight of gatherFlights) {
      if (flight.departure === true) {
        await SavedFlight.query().updateAndFetchById(flight.id, { departure: false });
      }
    }
    const makeDepartureTrue = await SavedFlight.query()
      .patch({ departure: true, arrival: false })
      .where({ flightID: id });
    const departureFlight = await SavedFlight.query().where({ flightID: id });
    return res.status(201).json({ departure: departureFlight });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default savedFlightsRouter;
