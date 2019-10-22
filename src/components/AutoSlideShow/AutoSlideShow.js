import React, { Component } from "react";
// import Decks from "../../decksList.json";
// import { Link } from "react-router-dom";
// import "./Preview.css";
import AutoShow from "./AutoShow";

class Preview extends Component {
  render() {
    return (
      <div className="presentation-page">
        <h1 className="header">{this.props.location.state.deck.title}</h1>
        <AutoShow slides={this.props.location.state.deck.slides} />
      </div>
    );
  }
}

export default Preview;
