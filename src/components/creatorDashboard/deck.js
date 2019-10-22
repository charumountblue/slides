import React, { Component } from 'react';
import './deck.css';
import MiniSlide from '../miniSlide/miniSlide';
import { Link } from 'react-router-dom';

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
              newHeight="250"
              newWidth="350"
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
              className="btn btn-outline-dark"
              onClick={this.delete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={this.props.editDeck.bind(this, this.props.id)}
            >
              Edit
            </button>
            <Link
              to={{
                pathname: `/preview/${this.props.id}`,
                state: { deck: this.props.deck }
              }}
            >
              <button type="button" className="btn btn-outline-dark">
                View
              </button>
            </Link>
          </div>
        </div>
        {this.state.displayModal ? (
          <div className="deck-deleteModal shadow">
            Are you sure?
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={this.props.deleteDeck.bind(this, this.props.id)}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
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
