import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
const { Option } = Select;
import { Redirect } from "react-router-dom";

const AddFlights = (props) => {
  let flightID;
  let tripID;
  const { pickedFlights, user } = props;
  const [trips, setTrips] = useState([]);
  const [tripName, setTripName] = useState({ name: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [selectTripID, setSelectTripID] = useState("");

  const fetchTrips = async () => {
    try {
      const response = await fetch("/api/v1/trips");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const tripResults = await response.json();
      setTrips(tripResults.rawTrip);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const tripsList = trips.map((trip) => {
    return (
      <Option key={trip.id} value={trip.id} name={trip.name}>
        {trip.name}
      </Option>
    );
  });

  const handleInputChange = (event) => {
    setTripName({ [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await postTrips();
    await postFlights();
    await postSavedTrips();
  };
  const handleSelectChange = async (event) => {
    setSelectTripID(event);
    tripID = event;
  };

  const postTrips = async () => {
    try {
      const response = await fetch("/api/v1/trips", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ ...tripName, userID: user }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      tripID = parsedResponse.trip.id;
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const postFlights = async () => {
    try {
      const response = await fetch("/api/v1/storeFlights", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(pickedFlights),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      flightID = parsedResponse.trip;
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const postSavedTrips = async () => {
    tripID === undefined ? (tripID = selectTripID) : (tripID = tripID);
    const savedTripsData = flightID.map((id) => {
      return { flightID: id.id, departure: false, arrival: false, tripID };
    });
    try {
      const response = await fetch("/api/v1/savedFlights", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(savedTripsData),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setShouldRedirect(true);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  if (shouldRedirect) {
    return <Redirect to="/profile" />;
  }

  const handleSelectSubmit = async (event) => {
    event.preventDefault();
    await postFlights();
    await postSavedTrips();
  };

  return (
    <div>
      <h4>Create a New Trip</h4>
      <div>
        <form className="tripsFormDiv" onSubmit={handleOnSubmit}>
          <label>
            <span className="label">Name of trip</span>
            <input type="text" name="name" onChange={handleInputChange}></input>
          </label>
          <button className="button primary hollow" type="submit">
            Create Trip
          </button>
        </form>
      </div>
      <div>
        <h4>OR </h4>
        <h4>Save to your Current Trips</h4>
        <form onSubmit={handleSelectSubmit}>
          <Space direction="vertical" size="large">
            <label>
              <span className="label"> Saved trips</span>
              <br></br>
              <Select
                onChange={handleSelectChange}
                placeholder="Your Saved Flights"
                style={{ width: 190 }}
              >
                {tripsList}
              </Select>
            </label>
            <button className="button primary hollow" type="submit">
              Save to this Trip
            </button>
          </Space>
        </form>
      </div>
    </div>
  );
};

export default AddFlights;
