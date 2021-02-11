import React, { useState } from "react";
import { Select, DatePicker, Space, Spin } from "antd";
import moment from "moment";

const FindFlights = (props) => {
  const [flights, setFlights] = useState({
    date: "",
    depAirport: "",
    arrAirport: "",
  });

  const [spin, setSpin] = useState(false);

  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }

  const depAirport = props.airports.airportsDep.map((airport) => {
    return (
      <Select.Option key={airport.PlaceId} value={airport.PlaceId} name={airport.PlaceName}>
        {airport.PlaceName}
      </Select.Option>
    );
  });

  const arrAirport = props.airports.airportsArr.map((airport) => {
    return (
      <Select.Option key={airport.PlaceId} value={airport.PlaceId} name={airport.PlaceName}>
        {airport.PlaceName}
      </Select.Option>
    );
  });

  function onDateChange(date, dateString) {
    setFlights({ ...flights, date: dateString });
  }

  const handleSelectChangeDep = (event) => {
    setFlights({
      ...flights,
      depAirport: event,
    });
  };

  const handleSelectChangeArr = (event) => {
    setFlights({
      ...flights,
      arrAirport: event,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSpin(true);
    fetchFlights();
  };

  const fetchFlights = async () => {
    try {
      const response = await fetch("/api/v1/flights", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(flights),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      props.flightsSubmittedHandler(parsedResponse);
      setSpin(false);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label>
          <span className="label">Departing airport:</span>
          <Select
            onChange={handleSelectChangeDep}
            style={{ width: 190 }}
            showSearch
            placeholder="Pick your airport"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            {depAirport}
          </Select>
        </label>

        <label>
          <span className="label">Arriving airport:</span>
          <Select
            onChange={handleSelectChangeArr}
            style={{ width: 190 }}
            showSearch
            placeholder="Pick your airport"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            {arrAirport}
          </Select>
        </label>
        <Space direction="vertical">
          <DatePicker onChange={onDateChange} picker="month" disabledDate={disabledDate} />
        </Space>
        <div>
          {spin === true ? <Spin></Spin> : <span></span>}
          <input className="Button" type="submit" value="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default FindFlights;
