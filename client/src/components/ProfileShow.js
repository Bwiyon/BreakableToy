import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table, Tag, Modal, Button, Card, Col, Row } from "antd";
import PlaneTicket from "./PlaneTicket";
import logo from "../pictures/ProfileShow.jpg";
import { ScheduleTwoTone } from "@ant-design/icons";

const ProfileShow = (props) => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState({
    departure: [],
    arrival: [],
  });
  const [visible, setVisible] = useState(false);

  let data = useLocation();
  const id = data.pathname.slice(9);

  const fetchFlightData = async () => {
    try {
      const response = await fetch(`/api/v1/savedFlights/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const tripResults = await response.json();
      setFlights(tripResults.flights);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const fetchFinalFlight = async () => {
    try {
      const response = await fetch(`/api/v1/savedFlights`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const finalResults = await response.json();

      setSelectedFlight({ arrival: finalResults.arrival, departure: finalResults.departure });
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchFlightData();
    fetchFinalFlight();
  }, []);

  const columns = [
    {
      title: "From",
      dataIndex: "depAirportName",
      key: "QuoteId",
    },
    {
      title: "To",
      dataIndex: "arrAirportName",
      key: "arrAirportName",
    },
    {
      title: "Date",
      dataIndex: "DepartureDate",
      key: "DepartureDate",
    },
    {
      title: "Price",
      dataIndex: "MinPrice",
      key: "MinPrice",
    },
    {
      title: "Airline",
      dataIndex: "airlineCarriers",
      key: "airlineCarriers",
    },
    {
      title: "Direct Flight",
      dataIndex: "Direct",
      key: "Direct",
      render: (Direct) => (
        <Tag color={`${Direct === "Direct" ? "green" : "volcano"}`}>{Direct}</Tag>
      ),
    },
    {
      title: "Select Departure",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <button className="button base small" onClick={setDeparture} value={id}>
          Departure
        </button>
      ),
    },
    {
      title: "Select Arrival",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <button className="button yellow small" onClick={setArrival} value={id}>
          Arrival
        </button>
      ),
    },
    {
      title: "Delete Flight",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <button className="button red small" onClick={clickDelete} value={id}>
          Delete
        </button>
      ),
    },
  ];

  const setDeparture = (event) => {
    event.preventDefault();
    const id = event.currentTarget.value;
    patchDeparture(id);
  };

  const setArrival = (event) => {
    event.preventDefault();
    const id = event.currentTarget.value;
    patchArrival(id);
  };

  const clickDelete = (event) => {
    event.preventDefault();
    const id = event.currentTarget.value;
    deleteSavedFlights(id);
    deleteFlights(id);
    fetchFlightData();
  };

  const deleteSavedFlights = async (id) => {
    try {
      const response = await fetch(`/api/v1/savedFlights/${id}`, {
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
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const deleteFlights = async (id) => {
    try {
      const response = await fetch(`/api/v1/storeFlights/${id}`, {
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
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const patchArrival = async (id) => {
    try {
      const response = await fetch(`/api/v1/savedFlights`, {
        method: "PATCH",
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
      fetchFinalFlight();
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const patchDeparture = async (id) => {
    try {
      const response = await fetch(`/api/v1/savedFlights/${id}`, {
        method: "PATCH",
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
      fetchFinalFlight();
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const openTicket = () => {
    setVisible(true);
  };

  let successBackgroundDep = selectedFlight.departure.DepartureDate
    ? { backgroundColor: "#dffbc3" }
    : { backgroundColor: "white" };

  let successBackgroundArr = selectedFlight.arrival.DepartureDate
    ? { backgroundColor: "#dffbc3" }
    : { backgroundColor: "white" };

  return (
    <div>
      <div>
        <img src={logo}></img>
      </div>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8} offset={2}>
            <Card
              title="Selected Departure"
              bordered={false}
              headStyle={{ backgroundColor: "#abc0c6" }}
              bodyStyle={successBackgroundDep}
            >
              {selectedFlight.departure.DepartureDate
                ? `${selectedFlight.departure.depAirport.slice(
                    0,
                    3
                  )} - ${selectedFlight.departure.arrAirport.slice(0, 3)} - ${
                    selectedFlight.departure.DepartureDate
                  } `
                : "Please select a starting Trip"}
            </Card>
          </Col>
          <Col span={8} offset={2}>
            <Card
              title="Selected Arrival"
              headStyle={{ backgroundColor: "#f1c40f" }}
              bodyStyle={successBackgroundArr}
            >
              {selectedFlight.arrival.id
                ? `${selectedFlight.arrival.depAirport.slice(
                    0,
                    3
                  )} - ${selectedFlight.arrival.arrAirport.slice(0, 3)} - ${
                    selectedFlight.arrival.DepartureDate
                  } `
                : "Please Select an ending trip"}
            </Card>
          </Col>
          <Col span={2}>
            {selectedFlight.arrival.id && selectedFlight.departure.id ? (
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={openTicket}
                icon={<ScheduleTwoTone twoToneColor="#52c41a" />}
              >
                Finalize Trip
              </Button>
            ) : (
              <Button type="primary" shape="round" size="large" disabled>
                Finalize Trip
              </Button>
            )}
          </Col>
        </Row>
      </div>
      ,
      <Table columns={columns} dataSource={flights} rowKey={(flights) => flights.QuoteId} />
      <Modal
        title="Save your trips"
        style={{ top: 20 }}
        centered
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" danger onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <PlaneTicket data={selectedFlight} />
      </Modal>
    </div>
  );
};

export default ProfileShow;
