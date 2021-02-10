import React, { useState } from "react";
import { Drawer, Button } from "antd";
import FindAirport from "./FindAirport";
import FindFlights from "./FindFlights";

const Browsing = (props) => {
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
    setDrawer({ ...drawer, visible: false });
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

  const dontMoveForwardButton = [
    <Button key="notReady" type="primary" disabled>
      next page
    </Button>,
  ];

  const moveForwardButton = [
    <Button key="ready" type="primary" onClick={showChildrenDrawer}>
      next page
    </Button>,
  ];

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Start Browsing
      </Button>
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
          title="Two-level Drawer"
          width={420}
          closable={false}
          onClose={onChildrenDrawerClose}
          visible={drawer.childrenDrawer}
        >
          <FindFlights airports={airports} />
        </Drawer>
      </Drawer>
    </div>
  );
};

export default Browsing;
