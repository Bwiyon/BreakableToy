import React from "react";
import { Carousel } from "antd";

const About = (props) => {
  return (
    <div className="aboutDiv">
      <div className="carousel">
        <Carousel>
          <Carousel>
            <div>
              <h3>
                <strong>What is a FlashPacker?</strong> <br></br> "One who travels with the intrepid
                ethos of a backpacker but having added comfort, style and technology whilst still
                maintaining a sense of exploration and adventure.Flashpackers travel in style and
                believe in roughing it in luxury.
              </h3>
            </div>
            <div>
              <h3>
                <strong>How do you use this App?</strong>
                <br></br>
                Use search flights to take a look at flight prices. Navigating to flight browsing
                will allow you to window shop and save your trips. You can even plan trips with
                other groups as well. If you are the leader of the trip, your friends will get
                flight prices from the airports they are based out of.
              </h3>
            </div>
            <div>
              <h3>
                <strong>Why build this App?</strong>
                <br></br>I have been traveling for about 8 years and have traveled to over 17
                countries. Every year I plan a group trip with my friends and I generally do all of
                the planning. This app will speed up the process for finding flight prices and help
                coordinate trips with my friends
              </h3>
            </div>
            <div>
              <h3>
                <strong>About the developer of this Application</strong>
                <br></br>My name is Brian Dinh and I am a software developer who has a background in
                sales. My frist trip out of the country was a one way ticket to europe for $100.
                Ever since then I have been traveling and have found that prices are really
                reasonable if you have flexbility in traveling. I hope you can find your next trip
                with my app.
              </h3>
            </div>
          </Carousel>
        </Carousel>
      </div>
    </div>
  );
};

export default About;
