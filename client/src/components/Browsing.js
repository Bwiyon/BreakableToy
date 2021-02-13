import React, { useState } from "react";
import { Drawer, Button, Table, Tag } from "antd";
import FindAirport from "./FindAirport";
import FindFlights from "./FindFlights";

const Browsing = (props) => {
  const [totalFlights, setTotalFlights] = useState([]);

  const [drawer, setDrawer] = useState({ visible: false, childrenDrawer: false });

  const [airports, setAirports] = useState({ airportsDep: [], airportsArr: [] });

  const [nextForm, setNextForm] = useState(false);

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
    const { arrAirport, depAirportName, arrAirportName, depAirport } = newFlights;
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
  };

  const dontMoveForwardButton = [
    <Button className="buttonbottom" key="notReady" type="primary" size="large" disabled>
      next page
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
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
        <h1 className="SearchResults"> Search Results</h1>
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
      <div>
        <Table
          columns={columns}
          dataSource={totalFlights}
          rowKey={(totalFlights) => totalFlights.QuoteId}
          rowSelection={rowSelection}
        />
      </div>
    </div>
  );
};

export default Browsing;
