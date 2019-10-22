import React, { PureComponent } from "react";
import "./Header.css";

class header extends PureComponent {
  render() {
    return (
      <div className="head">
        <nav className="navbar navbar-light">
          <a className="navbar-brand" href="/">
            <img
              src="slides-logo-blackbg.png"
              width="120"
              height="50"
              alt="Slides"
            ></img>
          </a>
          <a className="nav-item nav-link" href="/users/sign_in">
            Login/SignUp
          </a>
        </nav>
        
      </div>
    );
  }
}

export default header;
