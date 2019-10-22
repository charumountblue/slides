import React, { Component } from 'react';
import './SlideShow.css';

class slideShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      currentBlock: 1,
      blocks: [this.props.slides[0].blocks[0]]
    };
  }

  nextSlide = () => {
    if (this.state.currentSlide !== this.props.slides.length) {
      if (
        this.state.currentBlock !==
        this.props.slides[this.state.currentSlide].blocks.length
      ) {
        this.setState({
          currentBlock: this.state.currentBlock + 1
        });
        this.state.blocks.push(
          this.props.slides[this.state.currentSlide].blocks[
            this.state.currentBlock
          ]
        );
        // console.log("if");
        // console.log(this.state.currentSlide, this.state.currentBlock);
      } else {
        if (this.state.currentSlide !== this.props.slides.length - 1) {
          this.setState({
            currentSlide: this.state.currentSlide + 1,
            currentBlock: 1,
            blocks: [this.props.slides[this.state.currentSlide + 1].blocks[0]]
          });
          // console.log("else");
        }
      }
    }
  };

  previousSlide = () => {
    if (this.state.currentSlide >= 0) {
      if (this.state.currentBlock !== 1) {
        this.setState({
          currentBlock: this.state.currentBlock - 1
        });
        this.state.blocks.pop();
        // console.log("if");
        // console.log(this.state.currentSlide, this.state.currentBlock);
      } else {
        if (this.state.currentSlide > 0) {
          this.setState({
            currentSlide: this.state.currentSlide - 1,
            currentBlock: this.props.slides[this.state.currentSlide - 1].blocks
              .length,
            blocks: this.props.slides[this.state.currentSlide - 1].blocks
          });
          // console.log("else");
        }
      }
    }
  };

  render() {
    return (
      <div
        className="slide-show"
        style={{
          backgroundColor: this.props.slides[this.state.currentSlide]
            .backgroundColor
        }}
      >
        {console.log('render state', this.state)}
        {console.log(this.props.slides)}
        {console.log(this.state.blocks)}
        {this.state.blocks.map((block) =>
          block.type === 'text'
            ? React.createElement(
                block.format,
                {
                  style: {
                    position: 'absolute',
                    top: (block.top / 500) * 500,
                    left: (block.left / 700) * 700,
                    color: block.color,
                    backgroundColor: block.backgroundColor
                  },
                  className: block.transition
                },
                block.value
              )
            : React.createElement('img', {
                style: {
                  position: 'absolute',
                  top: (block.top / 500) * 500,
                  left: (block.left / 700) * 700,
                  height: (block.height / 500) * 500,
                  width: (block.width / 700) * 700
                },
                src: block.url,
                className: block.transition
              })
        )}
        <div className="nav-buttons">
          <img
            src="/left_arrow.png"
            onClick={this.previousSlide}
            className="nav-arr"
            alt="previous"
          ></img>
          <img
            src="/right_Arrow.jpg"
            onClick={this.nextSlide}
            className="nav-arr"
            alt="next"
          ></img>
        </div>
      </div>
    );
  }
}

export default slideShow;
