import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Content.css';

class homeBody extends PureComponent {
  render() {
    return (
      <div className="main-body-content">
        <div className="left-content">
          <h1>Make better presentations</h1>
          <p>
            Slides is a place for creating, presenting and sharing slide decks.
          </p>
          <Link to="/users/sign_in">
            <button type="button" className="btn btn-light">
              Login
            </button>
          </Link>
          <Link to="/explore">
            <button type="button" className="btn btn-light">
              Explore
            </button>
          </Link>
        </div>
        <div className="right-content">
          <img
            src="https://s3.amazonaws.com/media-p.slid.es/uploads/32388/images/4134866/align.gif"
            alt="demo"
          ></img>
          <h3>Slides is pixel perfect</h3>
        </div>
      </div>
    );
  }
}

export default homeBody;
