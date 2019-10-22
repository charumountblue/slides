import React, { Component } from 'react';
// import Decks from "../../decksList.json";
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import './Preview.css';
import SlideShow from './SlideShow';

class Preview extends Component {
  render() {
    return (
      <div className="presentation-page">
        <h1 className="header">{this.props.location.state.deck.title}</h1>
        <SlideShow slides={this.props.location.state.deck.slides} />
        <div className="deck-details">
          {/* {console.log(this.props.location.state)} */}
          <p className="content"></p>
          <p className="content">
            Creator: {this.props.location.state.deck.name}
          </p>
        </div>
      </div>
    );
  }
}

export default Preview;
