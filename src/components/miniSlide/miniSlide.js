import React, { Component } from 'react';
import Block from './block';

export class preview extends Component {
  render() {
    let selectedSlideStyle;
    if (this.props.currentSlideId !== undefined) {
      selectedSlideStyle =
        this.props.currentSlideId === this.props.slide.idSlide
          ? { border: '3px solid orange' }
          : {};
    } else {
      selectedSlideStyle = {};
    }
    selectedSlideStyle['backgroundColor'] = this.props.slide.backgroundColor;
    let blocks = [...this.props.slide.blocks];
    let blockElements = blocks.map((block) => (
      <Block
        newWidth={this.props.newWidth}
        newHeight={this.props.newHeight}
        {...block}
      ></Block>
    ));
    console.log(this.props.slide);
    return (
      <div
        className="slide"
        style={selectedSlideStyle}
        onClick={(e) =>
          this.props.onSlideSelection(e, this.props.slide.idSlide)
        }
      >
        {blockElements}
      </div>
    );
  }
}

export default preview;
