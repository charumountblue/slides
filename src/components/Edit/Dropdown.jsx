import React, { Component } from 'react';

class Dropdown extends Component {
  state = {};

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-sm-stretch">
        <button
          onClick={this.props.onAddTextBox}
          className="btn btn-secondary"
          type="button"
        >
          <b>TextBox</b>
        </button>
        {/* <label className="custom-file-label">
          <input
            calssName="custom-file-input"
            type="file"
            onChange={this.props.onImageChange}
          />
        </label> */}
        <div className="input-group ml-2 mr-1" style={{ width: '95%' }}>
          <div className="input-group-prepend">
            {/* <span
              className="input-group-text"
              id="inputGroupFileAddon01"
            ></span> */}
          </div>
          <div className="custom-file secondary-style">
            <input
              type="file"
              className="custom-file-input secondary-style"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
              textAlign={'left'}
              onChange={this.props.onImageChange}
            />
            <label className="custom-file-label secondary-style">
              <b style={{ color: 'white' }}>Choose Image file</b>
            </label>
          </div>
        </div>
      </div>

      // <div className="btn-group">
      //   <button
      //     type="button"
      //     className="btn btn-secondary dropdown-toggle"
      //     data-toggle="dropdown"
      //     aria-haspopup="true"
      //     aria-expanded="false"
      //   >
      //     Right-aligned menu
      //   </button>
      //   <div className="dropdown-menu dropdown-menu-right">
      //     <button
      //       onClick={this.props.onAddTextBox}
      //       className="dropdown-item"
      //       type="button"
      //     >
      //       TextBox
      //     </button>
      //     <button className="dropdown-item" type="button">
      //       Shapes
      //     </button>
      //     <button className="dropdown-item" type="button">
      //       Image
      //     </button>
      //   </div>
      // </div></div>
    );
  }
}

export default Dropdown;
