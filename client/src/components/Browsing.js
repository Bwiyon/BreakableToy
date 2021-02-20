import React, { useState } from "react";
import { Drawer, Button, Table, Tag, notification, Modal, Divider } from "antd";
import FindAirport from "./FindAirport";
import FindFlights from "./FindFlights";
import AddFlights from "./AddFlights";

const Browsing = (props) => {
  const [totalFlights, setTotalFlights] = useState([]);

  const [drawer, setDrawer] = useState({ visible: false, childrenDrawer: false });

  const [airports, setAirports] = useState({ airportsDep: [], airportsArr: [] });

  const [nextForm, setNextForm] = useState(false);

  const [user, setUser] = useState("");

  const [pickedFlights, setPickedFlights] = useState([]);

  const [addFlights, setAddFlights] = useState(false);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setDrawer({
      ...drawer,
      visible: true,
    });
  };

  const onClose = () => {
    setDrawer({
      ...drawer,
      visible: false,
    });
  };

  const showChildrenDrawer = () => {
    setDrawer({ ...drawer, childrenDrawer: true });
  };

  const onChildrenDrawerClose = () => {
    setDrawer({ ...drawer, childrenDrawer: false });
  };

  const airportsSubmittedHandler = (newAirports) => {
    setAirports(newAirports);
    setNextForm(true);
  };

  const flightsSubmittedHandler = async (newFlights) => {
    const { arrAirport, depAirportName, arrAirportName, depAirport, currentUserId } = newFlights;
    const { arrCountry, depCountry } = airports;
    await setDrawer({ ...drawer, childrenDrawer: false });
    await setDrawer({ ...drawer, visible: false });
    const flightResults = newFlights.Quotes.map((flights) => {
      const { QuoteId, MinPrice, Direct, OutboundLeg } = flights;
      const { DepartureDate } = OutboundLeg;
      let airlineCarriers;
      for (let carriers of newFlights.Carriers) {
        if (carriers.CarrierId === flights.OutboundLeg.CarrierIds[0]) {
          airlineCarriers = carriers.Name;
        }
      }
      return {
        airlineCarriers,
        depCountry,
        QuoteId,
        arrCountry,
        MinPrice: `$${MinPrice}`,
        Direct: `${Direct === true ? "Direct" : "Not Direct"}`,
        DepartureDate: DepartureDate.slice(0, 10),
        arrAirport,
        depAirport,
        arrAirportName,
        depAirportName,
      };
    });
    setTotalFlights(flightResults);
    setUser(currentUserId);
  };

  const dontMoveForwardButton = [
    <Button className="buttonbottom" key="notReady" type="primary" size="large" disabled>
      next
    </Button>,
  ];

  const moveForwardButton = [
    <Button
      className="buttonbottom"
      key="ready"
      type="primary"
      size="large"
      onClick={showChildrenDrawer}
    >
      next page
    </Button>,
  ];

  const noneSelectedNotification = (placement) => {
    notification.error({
      message: "Please select a trip to save",
      description:
        "You are trying to save a trip that isn't selected. Please go back and select the trips you wish to save.",
      placement,
    });
  };

  const userLogin = (placement) => {
    notification.warning({
      message: "You need to login to use this feature",
      description: `Please use the login below above to be able to save a trip to your account. `,
      placement,
    });
  };

  const handleAcceptFlight = (event) => {
    event.preventDefault();
    if (user === "") {
      userLogin("bottomRight");
    } else if (pickedFlights.length === 0) {
      setAddFlights(false);
      noneSelectedNotification("bottomLeft");
    } else {
      setVisible(true);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const acceptFlightButton = [
    <button key="btn1" className="btn1" onClick={handleAcceptFlight}>
      Save Flights
    </button>,
  ];

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
  ];

  const selectFlightsAndAddFlights = async (selectedRows) => {
    await setPickedFlights(selectedRows);
    await setAddFlights(true);
  };

  const rowSelection = {
    onChange: async (selectedRowKeys, selectedRows) => {
      selectFlightsAndAddFlights(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <div>
      <div className="showPageImage">
        <h1>Oh, the Places You'll Go</h1>
        <h2>-Dr. Seuss</h2>
        <button className="btn draw-border" onClick={showDrawer}>
          Start Browsing
        </button>
      </div>

      <div>
        <Divider plain>
          <h1 className="SearchResults">Search Results</h1>
        </Divider>
      </div>

      <Drawer
        title="Where do you want to go?"
        width={320}
        closable={false}
        onClose={onClose}
        visible={drawer.visible}
      >
        <FindAirport airportsSubmittedHandler={airportsSubmittedHandler} />
        {nextForm ? moveForwardButton : dontMoveForwardButton}
        <Drawer
          title="Select your airports and dates"
          width={420}
          closable={false}
          onClose={onChildrenDrawerClose}
          visible={drawer.childrenDrawer}
        >
          <FindFlights airports={airports} flightsSubmittedHandler={flightsSubmittedHandler} />
        </Drawer>
      </Drawer>
      <div className="buttonBottomBrowsing">
        <Table
          columns={columns}
          dataSource={totalFlights}
          rowKey={(totalFlights) => totalFlights.QuoteId}
          rowSelection={rowSelection}
        />
        <div className="buttonBottomBrowsing">
          {addFlights ? acceptFlightButton : dontMoveForwardButton}
        </div>
      </div>
      <Modal
        title="Save your trips"
        centered
        visible={visible}
        width={500}
        onCancel={handleCancel}
        footer={[
          <Button key="back" danger onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <AddFlights pickedFlights={pickedFlights} user={user} />
      </Modal>
    </div>
  );
};

export default Browsing;
