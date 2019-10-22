import React, { Component } from "react";

export default class explore extends Component {
  
  handleChange = event => {
    this.props.textChange(event);
  };

  render() {
    return (
      <div>
        <section className="search">
          <form className="search-form">
            <div className="search-term-wrapper">
              <input onChange={this.handleChange} 
                type="search"
                className="search-bar"
                placeholder="Search for decks..."
              ></input>
              {/* <div className="button white search-clear">
                <span className="icon i-close"></span>
              </div> */}
            </div>
            {/* <button
              type="submit"
              className="search-submit button white xl ladda-button"
              data-style="zoom-out"
              data-spinner-color="#333"
            >
              <i className="fa fa-search" aria-hidden="true"></i>
              <span className="ladda-label">
                <span className="icon i-search"></span>
              </span>
              <span className="ladda-spinner"></span>
            </button> */}
          </form>
        </section>
      </div>
    );
  }
}
