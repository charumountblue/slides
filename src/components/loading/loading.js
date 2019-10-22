import React, { Component } from 'react';
import './loading.css';
export class loading extends Component {
  render() {
    return (
      <div className="loader">
        <div className="ring">
          Loading
          <span className="loader-span"></span>
        </div>
      </div>
    );
  }
}

export default loading;
