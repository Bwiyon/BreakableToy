import React from "react";
import FindAirport from "./FindAirport.js";
const Flights = (props) => {
  return (
    <div>
      <h1>Please search for a flight</h1>
      <form>
        <FindAirport />
      </form>
    </div>
  );
};

export default Flights;
