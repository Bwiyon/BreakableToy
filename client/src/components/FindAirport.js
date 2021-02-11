import React, { useState } from "react";
import countriesList from "../Data/countriesList.js";
import { Select, Spin } from "antd";
const { Option } = Select;

const FindAirport = (props) => {
  const [flight, setFlight] = useState({
    departure: "",
    depCountry: "",
    arrival: "",
    arrCountry: "",
  });

  const [spin, setSpin] = useState(false);

  const handleInputChange = (event) => {
    setFlight({
      ...flight,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChangeDep = (event) => {
    setFlight({
      ...flight,
      depCountry: event,
    });
  };

  const handleSelectChangeArr = (event) => {
    setFlight({
      ...flight,
      arrCountry: event,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSpin(true);
    fetchAirport();
  };

  const fetchAirport = async () => {
    try {
      const response = await fetch("/api/v1/airports", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(flight),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      props.airportsSubmittedHandler(parsedResponse);
      setSpin(false);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const countriesMap = countriesList.map((country) => {
    return (
      <Option key={country.Code} value={country.Code} name={country.Name}>
        {country.Name}
      </Option>
    );
  });

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label>
          <span className="label">Departing Country:</span>
          <Select
            onChange={handleSelectChangeDep}
            style={{ width: 190 }}
            showSearch
            placeholder="Pick your Country"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            {countriesMap}
          </Select>
        </label>
        <label>
          <span className="label"> Departing City</span>
          <input
            type="text"
            name="departure"
            onChange={handleInputChange}
            value={flight.departure}
          ></input>
        </label>

        <label>
          <span className="label">Arriving Country:</span>
          <Select
            onChange={handleSelectChangeArr}
            style={{ width: 190 }}
            showSearch
            placeholder="Pick your Country"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            {countriesMap}
          </Select>
        </label>

        <label>
          <span className="label"> Arrival City</span>
          <input
            type="text"
            name="arrival"
            onChange={handleInputChange}
            value={flight.arrival}
          ></input>
        </label>

        <div>
          {spin === true ? <Spin></Spin> : <span></span>}
          <input className="Button secondary" type="submit" value="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default FindAirport;
