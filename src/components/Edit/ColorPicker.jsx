import React from 'react';
import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color';

class SketchExample extends React.Component {
  // selectedSlide = this.state.slide ? this.state.slide : [];
  pickColor =
    this.props.colorType === 'textColor'
      ? this.props.block.color
      : this.props.colorType === 'backgroundColor'
      ? this.props.block.backgroundColor
      : this.props.colorType === 'slideColor'
      ? this.props.slide.backgroundColor
      : '#F17013';
  isSlide = this.props.colorType === 'slideColor' ? true : false;
  state = {
    displayColorPicker: false,
    color: this.pickColor
  };
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.slide.backgroundColor, prevState);
    if (this.isSlide) {
      if (prevState.color !== this.props.slide.backgroundColor) {
        this.setState({ color: this.props.slide.backgroundColor });
      }
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
    this.props.onColorPick(this.state.color, this.props.colorType);
  };

  handleChange = (color) => {
    this.setState({ color: color.hex });
  };

  render() {
    // console.clear();
    // console.log(this.props.slide.backgroundColor);
    const styles = reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          // border: '2px  white solid',
          background: this.state.color
        },
        swatch: {
          padding: '5px',
          background: this.state.color,
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          border: '2px white solid'
        },
        popover: {
          position: 'absolute',
          zIndex: '2'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <ChromePicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default SketchExample;
