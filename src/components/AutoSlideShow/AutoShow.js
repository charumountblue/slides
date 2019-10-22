import React, { Component } from "react";
import "../Preview/SlideShow.css";
import ReactTimeout from 'react-timeout'

class autoShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      currentBlock: 0,
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
        this.handleClick();
        // console.log("if");
        // console.log(this.state.currentSlide, this.state.currentBlock);
      } else {
        if (this.state.currentSlide !== this.props.slides.length - 1) {
          this.setState({
            currentSlide: this.state.currentSlide + 1,
            currentBlock: 1,
            blocks: [this.props.slides[this.state.currentSlide + 1].blocks[0]]
          });
          this.handleClick();
        }
      }
    }
  };

  handleClick = (e) => {
    this.props.setTimeout(this.nextSlide, 1000) // call the `toggle` function after 5000ms
    document.getElementById("show").webkitRequestFullscreen();
  }

  render() {
    // console.log(this.props,this.state);
    return (
      <div className="slide-show" id="show" style={{backgroundColor:this.props.slides[this.state.currentSlide].backgroundColor}}>
        {this.state.blocks.map(block =>
          block.type === "text"
            ? React.createElement(
                block.format,
                {
                  style: {
                    position: "absolute",
                    top: block.top + 20,
                    left: block.left + 250,
                    color: block.color,
                    backgroundColor: block.backgroundColor
                  },
                  className: block.transition
                },
                block.value
              )
            : React.createElement(
                'img',
                {
                  style: {
                    position: "absolute",
                    top: block.top + 20,
                    left: block.left + 250,
                    height: block.height,
                    width: block.width,
                  },
                  src: block.url,
                  className: block.transition
                },
              )
        )}
        <button onClick={this.handleClick}>Start Show!</button>
      </div>
    );
  }
}

export default ReactTimeout(autoShow);
