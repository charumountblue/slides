import React, { Component } from "react";
import Slide from "./Slide";

class Slides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props_idDeck: 10,
      slides: props.fetchSlides || []
    };
  }

  componentDidMount() {
    // console.log(this.state.slides);
    this.setState({ slides: this.props.fetchSlides });
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    // console.log(prevProps, prevState);
    if (prevProps.fetchSlides !== this.props.fetchSlides) {
      this.setState({ slides: this.props.fetchSlides });
    }
  }

  render() {
    return (
      <div className="slides-div">
        {/* <h3 className="text-center editor-headings">Slides</h3> */}
        <div className="slide-scroll">
          {this.state.slides.map(slide => (
            <Slide
              currentSlideId={this.props.currentSlideId}
              key={slide.idSlide}
              onSlideSelection={this.props.onSlideSelection}
              // onClick={() => this.props.onSlideSelection(slide.idSlide)}
              slide={slide}
            />
          ))}
        </div>
        <div className="text-center mt-1">
          <button
            onClick={this.props.onAddSlide}
            className="btn btn-outline-light m-1"
          >
            Add New Slide
          </button>
        </div>
      </div>
    );
  }
}

export default Slides;
