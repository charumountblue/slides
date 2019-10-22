import React, { PureComponent } from "react";
import Content from "./Content"
import './HomeBody.css'

class homeBody extends PureComponent {
  render() {
    return (
      <div className="main-body-area"> 
        <svg
          width="100%"
          height="80vh"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
        >
          <path
            className="path-1"
            bg-primary
            d="M0,400 L 1000,400 1000,480 S 500,420 0,480 Z"
            fill="#e4637c"
          ></path>
          <path
            className="path-2"
            d="M0,400 L 1000,400 1000,445 S 500,420 0,480 Z"
            fill="#2b74c3"
          ></path>
          <path
            className="path-3"
            d="M0,0 L 1000,0 1000,400 S 500,420 0,480 Z"
            fill="#358eef"
          ></path>
        </svg>
        <Content/>
      </div>
    );
  }
}

export default homeBody;
