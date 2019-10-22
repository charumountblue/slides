import React, { Component } from 'react';

export class imageblock extends Component {
  render() {
    let styleToApply = {};
    styleToApply['position'] = 'absolute';
    styleToApply['left'] = (this.props.left / 700) * this.props.newWidth;
    styleToApply['top'] = (this.props.top / 500) * this.props.newHeight;
    styleToApply['padding'] = '1px';
    styleToApply['height'] = (this.props.height / 500) * this.props.newHeight;
    styleToApply['width'] = (this.props.width / 700) * this.props.newWidth;
    let src = this.props.url;
    return <img src={src} style={styleToApply} />;
  }
}

export default imageblock;
