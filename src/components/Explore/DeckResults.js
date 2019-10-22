import React, { PureComponent } from 'react';
import './DeckResults.css';
import { Link } from 'react-router-dom';
import MiniSlide from '../miniSlide/miniSlide';

class SearchResults extends PureComponent {
  onSlideSelection = (e) => {
    e.preventDefault();
  };
  render() {
    let decks = this.props.deckData.filter((deck) => {
      if (deck.slides !== undefined && deck.slides[0] !== undefined) {
        return deck;
      }
    });
    // console.clear(this.props.deckData);
    return (
      <div className="search-results">
        {/* {console.log("Deckdata", this.props.deckData)} */}
        {decks.map((deck) => (
          <div className="deck-explore" id={deck.idDeck}>
            <MiniSlide
              newHeight="250"
              newWidth="350"
              slide={deck.slides[0]}
              onSlideSelection={this.onSlideSelection}
            ></MiniSlide>
            <b><p>{deck.title}</p></b>
            <Link to={{ pathname: `/preview/${deck.idDeck}`, state: { deck } }}>
              <p className="link-show">Preview</p>{' '}
            </Link>
            <Link to={{ pathname: `/autoSlideShow/${deck.idDeck}`, state: { deck } }}>
              <p className="link-show">View Slide Show</p>{' '}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
