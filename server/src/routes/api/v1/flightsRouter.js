import express from "express";
import fetch from "node-fetch";

const flightsRouter = new express.Router();

flightsRouter.post("/", async (req, res) => {
  let currentUserId = "";
  if (req.user) {
    currentUserId = req.user.id;
  }
  const { date, depAirport, arrAirport } = req.body;
  try {
    const response = await fetch(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${depAirport}/${arrAirport}/${date}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": `${process.env.SECRET_KEY}`,
          "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        },
      }
    );
    const flightResults = await response.json();
    const { Carriers, Quotes } = flightResults;
    return res.status(200).json({ Carriers, Quotes, currentUserId });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default flightsRouter;
