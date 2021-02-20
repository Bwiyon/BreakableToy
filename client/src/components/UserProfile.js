import React, { useState, useEffect } from "react";
import { Card, Popconfirm, Modal, message } from "antd";
import { Link } from "react-router-dom";
import EditTrip from "./EditTrip";
import friends from "../pictures/friends.jpg";

import { DeleteTwoTone, EditTwoTone, CalendarTwoTone } from "@ant-design/icons";

const UserProfile = (props) => {
  const [trips, setTrips] = useState([]);
  const [visible, setVisible] = useState(false);
  const [tripId, setTripId] = useState("");

  const handleCancel = () => {
    setVisible(false);
  };

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

  const confirm = (id) => {
    setTripId(id);
    deleteTrip(id);
  };

  const edit = (id) => {
    setTripId(id);
    setVisible(true);
  };

  const handleEditSubmit = (formPayLoad) => {
    editTrips(formPayLoad);
  };

  const deleteTrip = async (id) => {
    try {
      const savedTripsResponse = await fetch("/api/v1/savedFlights", {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ id }),
      });
      const parsedResponse = await savedTripsResponse.json();
      const flightResponse = await fetch("/api/v1/storeFlights", {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ info: parsedResponse.trip }),
      });
      const response = await fetch("/api/v1/trips", {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      fetchTrips();
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const editTrips = async (formPayLoad) => {
    try {
      const response = await fetch(`/api/v1/trips/${tripId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(formPayLoad),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const success = () => {
    message.success("Trip was deleted");
  };

  const tripTiles = trips.map((trip) => {
    return (
      <div key={trip.id}>
        <Card
          hoverable
          size="small"
          style={{ width: 300 }}
          cover={
            <img
              alt="vacation"
              src="https://images.pexels.com/photos/1058959/pexels-photo-1058959.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
          }
          actions={[
            <button>
              <Link to={{ pathname: `/profile/${trip.id}`, props: { tripID: trip.id } }}>
                <CalendarTwoTone />
              </Link>
            </button>,
            <button
              onClick={() => {
                edit(trip.id);
              }}
            >
              <EditTwoTone twoToneColor="#52c41a" />
            </button>,
            <button>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => {
                  confirm(trip.id);
                  success();
                }}
                okText="Yes"
                cancelText="No"
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </Popconfirm>
            </button>,
          ]}
        >
          {trip.name}
        </Card>
      </div>
    );
  });

  return (
    <div className="userProfileBackground">
      <div className="userProfileDiv">
        <img src={friends} />
        <div className="center">
          <h2>“A journey is best measured in friends, rather than miles.” </h2>
        </div>
        <div className="top-left">
          <h1>My Account</h1>
        </div>
      </div>
      <div className="tripTiles">{tripTiles}</div>
      <Modal
        title="Change your trip name"
        centered
        visible={visible}
        width={300}
        onCancel={handleCancel}
        footer={null}
      >
        <EditTrip handleEditSubmit={handleEditSubmit}></EditTrip>
      </Modal>
    </div>
  );
};

export default UserProfile;
