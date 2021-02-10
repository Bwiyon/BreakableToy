import React from "react";
import FindAirport from "./FindAirport.js";
const Flights = (props) => {
  return (
    <div className="basicSearch">
      <h1>Please search for a flight</h1>
      <FindAirport />
    </div>
  );
};

export default Flights;
