import React, { Component } from 'react';
import getElementHTML from './utils';

class Workspace extends Component {
  state = {};
  render() {
    return (
      <div
        className="workspace d-flex align-items-center justify-content-center"
        id="workspace"
      >
        <div className="canvas-area">
          {this.props.workspace.map((block) => getElementHTML(block))}
        </div>
      </div>
    );
  }
}

export default Workspace;
