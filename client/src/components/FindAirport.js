import React, { useState } from "react";
import countriesList from "../Data/countriesList.js";
import { Select } from "antd";
const { Option } = Select;

const FindAirport = (props) => {
  const [flight, setFlight] = useState({
    departure: "",
    depCountry: "",
  });

  const handleInputChange = (event) => {
    setFlight({
      ...flight,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event) => {
    debugger;
    setFlight({
      ...flight,
      depCountry: event,
    });
  };

  const countriesMap = countriesList.map((country) => {
    return (
      <Option key={country.Code} value={country.Code}>
        {country.Name}
      </Option>
    );
  });

  return (
    <div>
      <label>
        Country:
        <Select
          onChange={handleSelectChange}
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
        What city would you like to fly to?
        <input
          type="text"
          name="departure"
          onChange={handleInputChange}
          value={flight.departure}
        ></input>
      </label>
    </div>
  );
};

export default FindAirport;
