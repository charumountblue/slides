import React, { Component } from "react";
import Dropdown from "./Dropdown";
import ToolboxOptions from "./ToolboxOptions";

class Toolbox extends Component {
  state = {};
  render() {
    return (
      <div className="toolbox">
        {/* <h3 className="text-center mt-1 editor-headings">Toolbox</h3> */}
        <div className="text-center mt-1">
          <Dropdown
            onAddTextBox={this.props.onAddTextBox}
            onImageChange={this.props.onImageChange}
          />
        </div>
        <div
          className="my-1"
          style={{ backgroundColor: "white", height: "60%" }}
        >
          <ToolboxOptions
            onApplyStyle={this.props.onApplyStyle}
            block={this.props.block}
            slides={this.props.slides}
            slide={this.props.slide}
            onChangeStyle={this.props.onChangeStyle}
            onColorPick={this.props.onColorPick}
            onDeleteSlide={this.props.onDeleteSlide}
            onImageSizeChange={this.props.onImageSizeChange}
          />
        </div>
        <div className="my-1">
          <button
            onClick={this.props.onSaveSlide}
            className="btn btn-outline-success"
          >
            Save Slide
          </button>
          <button
            onClick={e => this.props.onSaveDeck(e)}
            className="btn btn-outline-success"
            disabled={this.props.isUploadingFiles}
          >
            Save Deck
          </button>
        </div>

        <button
          onClick={e => this.props.onDashBoardNavigation(e)}
          className="btn btn-outline-light"
          disabled={this.props.isUploadingFiles}
        >
          {"<< Dash Board"}
        </button>
      </div>
    );
  }
}

export default Toolbox;
