import React, { Component } from 'react';
import ColorPicker from './ColorPicker';

class ToolboxOptions extends Component {
  state = {};
  render() {
    if (this.props.slide !== undefined) {
      // console.log(this.props.slide);
    }
    const disabled = this.props.slides.length >= 2 ? false : true;
    const styles = {
      left: { property: 'textAlign', value: 'left' },
      center: { property: 'textAlign', value: 'center' },
      right: { property: 'textAlign', value: 'right' },
      h1: { property: 'format', value: 'h1' },
      h2: { property: 'format', value: 'h2' },
      p: { property: 'format', value: 'p' },
      slideInDown: { property: 'transition', value: 'animated slideInDown' },
      rollIn: { property: 'transition', value: 'animated rollIn' },
      flipInX: { property: 'transition', value: 'animated flipInX' }
    };
    let height = 200;
    let width = 200;
    if (this.props.block !== null) {
      height = 'height' in this.props.block ? this.props.block.height : 200;
      width = 'width' in this.props.block ? this.props.block.width : 200;
    }
    return this.props.block !== null ? (
      this.props.block.type === 'text' ? (
        <div>
          <div className="toolbox-options">
            <div>
              <p style={{ fontWeight: 'bold' }}>Toolbox:</p>
              <div className="d-flex">
                <label>Text Color : </label>
                <ColorPicker
                  block={this.props.block}
                  colorType="textColor"
                  onColorPick={this.props.onColorPick}
                />
              </div>
              <div className="d-flex">
                <label>Background : </label>
                <ColorPicker
                  block={this.props.block}
                  colorType="backgroundColor"
                  onColorPick={this.props.onColorPick}
                />
              </div>
            </div>
            <p class="element-property-heading">Alignment</p>
            <button
              onClick={() => this.props.onChangeStyle(styles.left)}
              className="btn btn-outline-warning"
            >
              Left
            </button>
            <button
              onClick={() => this.props.onChangeStyle(styles.center)}
              className="btn btn-outline-warning"
            >
              Center
            </button>
            <button
              onClick={() => this.props.onChangeStyle(styles.right)}
              className="btn btn-outline-warning"
            >
              Right
            </button>
          </div>
          <div className="toolbox-options">
            <p class="element-property-heading">Font format</p>
            <button
              onClick={() => this.props.onChangeStyle(styles.h1)}
              className="btn btn-outline-warning"
            >
              h1
            </button>
            <button
              onClick={() => this.props.onChangeStyle(styles.h2)}
              className="btn btn-outline-warning"
            >
              h2
            </button>
            <button
              onClick={() => this.props.onChangeStyle(styles.p)}
              className="btn btn-outline-warning"
            >
              p
            </button>
          </div>

          <div className="toolbox-options">
            <p class="element-property-heading">Transition</p>
            <button
              onClick={() => this.props.onChangeStyle(styles.slideInDown)}
              className="btn btn-outline-warning"
            >
              Slide In Down
            </button>
            <button
              onClick={() => this.props.onChangeStyle(styles.rollIn)}
              className="btn btn-outline-warning"
            >
              Roll In
            </button>
            <button
              onClick={() => this.props.onChangeStyle(styles.flipInX)}
              className="btn btn-outline-warning"
            >
              Flip In X
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p> This is meant for images</p>
          <label>
            Width:{' '}
            <input
              name={'imageWidth'}
              onChange={this.props.onImageSizeChange}
              maxLength={3}
              size={3}
              type="number"
              min="1"
              max="700"
              value={width}
            ></input>
          </label>
          <label>
            Height:{' '}
            <input
              name={'imageHeight'}
              onChange={this.props.onImageSizeChange}
              maxLength={3}
              size={3}
              type="number"
              min="1"
              max="500"
              value={height}
            ></input>
          </label>
        </div>
      )
    ) : (
      <div>
        <p>Select a Block to change style</p>
        <div className="d-flex">
          <label>Slide Background : </label>
          <ColorPicker
            slide={this.props.slide}
            colorType="slideColor"
            onColorPick={this.props.onColorPick}
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={this.props.onDeleteSlide}
          disabled={disabled}
        >
          Delete Slide
        </button>
      </div>
    );
  }
}

export default ToolboxOptions;
