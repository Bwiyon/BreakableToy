import React, { useState, useEffect } from "react";
import { Card, Popconfirm } from "antd";
import { Link } from "react-router-dom";

const UserProfile = (props) => {
  const [trips, setTrips] = useState([]);

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
    console.log(id);
  };

  const edit = (id) => {
    console.log(id);
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
              <Link to={`/profile/${trip.id}`}>view</Link>
            </button>,
            <button
              onClick={() => {
                edit(trip.id);
              }}
            >
              Edit
            </button>,
            <button>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => {
                  confirm(trip.id);
                }}
                okText="Yes"
                cancelText="No"
              >
                Delete
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
        <img src="https://images.unsplash.com/photo-1468078809804-4c7b3e60a478?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" />
        <div className="center">
          <h1>“A journey is best measured in friends, rather than miles.” </h1>
        </div>
        <div className="top-left">
          <h2>My Account</h2>
        </div>
      </div>
      <div className="tripTiles">{tripTiles}</div>
    </div>
  );
};

export default UserProfile;
