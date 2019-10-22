import React, { Component } from 'react';
import MiniSlide from '../miniSlide/miniSlide';
class Slide extends Component {
  state = {};
  render() {
    return (
      <MiniSlide {...this.props} newHeight="100" newWidth="140"></MiniSlide>
    );
  }
}

export default Slide;
