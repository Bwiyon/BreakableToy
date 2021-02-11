import express from "express";
import fetch from "node-fetch";

const airportsRouter = new express.Router();

airportsRouter.post("/", async (req, res) => {
  const { departure, depCountry, arrival, arrCountry } = req.body;
  try {
    const responseDep = await fetch(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${depCountry}/USD/en-US/?query=${departure}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": `${process.env.SECRET_KEY}`,
          "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        },
      }
    );
    const responseArr = await fetch(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${arrCountry}/USD/en-US/?query=${arrival}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": `${process.env.SECRET_KEY}`,
          "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        },
      }
    );
    const airportsDep = await responseDep.json();
    const airportsArr = await responseArr.json();
    return res
      .status(200)
      .json({ airportsDep: airportsDep.Places, airportsArr: airportsArr.Places });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default airportsRouter;
