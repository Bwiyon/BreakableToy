import React from "react";

const PlaneTicket = (props) => {
  debugger;
  //get user email setup.
  const { arrival, departure } = props.data;
  return (
    <div className="profileTable">
      <div className="box">
        <div className="clip" />
        <ul className="left">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <ul className="right">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <div className="ticket">
          <span className="airline">{departure.airlineCarriers}</span>
          <span className="airline airlineslip">{arrival.airlineCarriers}</span>
          <span className="boarding">FlashPacker</span>
          <div className="content">
            <span className="jfk">{departure.depAirport.slice(0, 3)}</span>
            <span className="plane">
              {/*?xml version="1.0" ?*/}
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                height={60}
                width={60}
                imageRendering="optimizeQuality"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="#222">
                  <line
                    fill="none"
                    strokeLinecap="round"
                    strokeWidth={30}
                    x1={300}
                    x2={55}
                    y1={390}
                    y2={390}
                  />
                  <path
                    d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z"
                    fill="#222"
                    strokeLinejoin="round"
                    strokeWidth={10}
                  />
                </g>
              </svg>
            </span>
            <span className="sfo">{departure.arrAirport.slice(0, 3)}</span>
            <span className="jfk jfkslip">{arrival.depAirport.slice(0, 3)}</span>
            <span className="plane planeslip">
              {/*?xml version="1.0" ?*/}
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                height={50}
                width={50}
                imageRendering="optimizeQuality"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="#222">
                  <line
                    fill="none"
                    strokeLinecap="round"
                    strokeWidth={30}
                    x1={300}
                    x2={55}
                    y1={390}
                    y2={390}
                  />
                  <path
                    d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z"
                    fill="#222"
                    strokeLinejoin="round"
                    strokeWidth={10}
                  />
                </g>
              </svg>
            </span>
            <span className="sfo sfoslip">{arrival.arrAirport.slice(0, 3)}</span>
            <div className="sub-content">
              <span className="watermark">Postsnap</span>
              <span className="name">
                PASSENGER EMAIL
                <br />
                <span>BLOGGS, Joe</span>
              </span>
              <span className="flight">
                CONNECTION
                <br />
                <span>{departure.Direct}</span>
              </span>
              <span className="seat">
                PRICE
                <br />
                <span>{departure.MinPrice}</span>
              </span>
              <span className="boardingtime">
                BOARDING DATE
                <br />
                <span>{departure.DepartureDate}</span>
              </span>
              <span className="flight flightslip">
                CONNECTION
                <br />
                <span>{arrival.Direct}</span>
              </span>
              <span className="seat seatslip">
                PRICE
                <br />
                <span>{arrival.MinPrice}</span>
              </span>
              <span className="name nameslip">
                Boarding Date
                <br />
                <span>{arrival.DepartureDate}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaneTicket;
