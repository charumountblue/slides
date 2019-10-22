import React, { Component } from 'react';
import './deck.css';
import MiniSlide from '../miniSlide/miniSlide';

export class deck extends Component {
  state = { displayModal: false };
  onSlideSelection = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <div className="deck-dashboard">
          <div className="preview-dashboard">
            <MiniSlide
              slide={this.props.previewSlide}
              newHeight="270"
              newWidth="380"
              onSlideSelection={this.onSlideSelection}
            ></MiniSlide>
          </div>
          <div className="text-details-dashboard">
            <h2>{this.props.title}</h2>
            <p>{this.props.description}</p>
          </div>
          <div className="buttons-dashboard">
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={this.delete}
            >
              Delete
            </button>
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={this.props.editDeck.bind(this, this.props.id)}
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={this.props.viewDeck.bind(this, this.props.id)}
            >
              View
            </button>
          </div>
        </div>
        {this.state.displayModal ? (
          <div className="deck-deleteModal shadow">
            Are you sure?
            <button
              type="button"
              class="btn btn-outline-warning"
              onClick={this.props.deleteDeck.bind(this, this.props.id)}
            >
              Yes
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              onClick={this.hideModal}
            >
              No
            </button>
          </div>
        ) : null}
      </div>
    );
  }
  delete = (e) => {
    this.setState({ displayModal: !this.state.displayModal });
  };
  hideModal = (e) => {
    this.setState({ displayModal: !this.state.displayModal });
  };
}

export default deck;
