import React, { Component } from 'react';

export class block extends Component {
  render() {
    // console.log(this.props);
    let styleToApply = {};
    if (this.props.format == 'h1' || this.props.format == 'h2') {
      styleToApply['fontWeight'] = 'bold';
    } else {
      styleToApply['fontWeight'] = 'normal';
    }
    styleToApply['position'] = 'absolute';
    styleToApply['left'] = (this.props.left / 700) * this.props.newWidth;
    styleToApply['textAlign'] = this.props.textAlign;
    styleToApply['top'] = (this.props.top / 500) * this.props.newHeight;
    styleToApply['padding'] = '1px';
    styleToApply['color'] = this.props.color;
    styleToApply['backgroundColor'] = this.props.backgroundColor;
    let value = this.props.value;
    // if (value.length > 20) {
    //   value = value.split('');
    //   value = value.slice(0, 17);
    //   value = value.join('');
    //   value = value + '...';
    // }
    // console.log(this.props);
    return <p style={styleToApply}>{value}</p>;
  }
}

export default block;
