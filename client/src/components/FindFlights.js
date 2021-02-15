import React, { useState } from "react";
import { Select, DatePicker, Space, Spin, Alert } from "antd";
import moment from "moment";

const FindFlights = (props) => {
  const [flights, setFlights] = useState({
    date: "",
    depAirport: "",
    arrAirport: "",
    depAirportName: "",
    arrAirportName: "",
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
    let depAirportName;
    for (let dep of props.airports.airportsDep) {
      if (event === dep.PlaceId) {
        depAirportName = dep.PlaceName;
      }
    }
    setFlights({
      ...flights,
      depAirport: event,
      depAirportName,
    });
  };

  const handleSelectChangeArr = (event) => {
    let arrAirportName;
    for (let arr of props.airports.airportsArr) {
      if (event === arr.PlaceId) {
        arrAirportName = arr.PlaceName;
      }
    }
    setFlights({
      ...flights,
      arrAirport: event,
      arrAirportName,
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
      const { Carriers, Quotes, currentUserId } = parsedResponse;
      props.flightsSubmittedHandler({ ...flights, Quotes, Carriers, currentUserId });
      setSpin(false);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  return (
    <div className="findFlights">
      <form onSubmit={handleOnSubmit}>
        <Space direction="vertical" size="large">
          <label>
            <span className="label">Departing airport:</span>
            <br></br>
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
            <br></br>
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

          <DatePicker onChange={onDateChange} picker="month" disabledDate={disabledDate} />

          <div>
            <input className="button primary" type="submit" value="submit"></input>
          </div>
          {spin === true ? (
            <Spin>
              <Alert message="Finding Flights"></Alert>
            </Spin>
          ) : (
            <span></span>
          )}
        </Space>
      </form>
    </div>
  );
};

export default FindFlights;
