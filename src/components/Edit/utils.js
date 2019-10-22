import React, { Component } from 'react';

class TextElement extends Component {
  state = {
    hover: false
  };
  getHTML = (jsonElement) => {
    let htmlElement = null;
    if (jsonElement.type === 'text') {
      const { textAlign } = jsonElement;
      let size = jsonElement.value.length;
      if (size <= 5) {
        size = 10;
      }
      const color = 'color' in jsonElement ? jsonElement.color : 'black';
      const transition = jsonElement.transition || '';
      const backgroundColor =
        'backgroundColor' in jsonElement
          ? jsonElement.backgroundColor
          : 'trasparent';
      // console.log('Size Of Input', size);

      const styles = {
        h1: {
          display: 'block',
          fontSize: '2em',
          margin: 0,
          fontWeight: 'bold',
          padding: 0,
          border: 0,
          textAlign,
          color,
          backgroundColor
        },
        h2: {
          display: 'block',
          fontSize: '1.5em',
          margin: 0,
          fontWeight: 'bold',
          padding: 0,
          border: 0,
          textAlign,
          color,
          backgroundColor
        },
        p: {
          display: 'block',
          marginLeft: 0,
          marginRight: 0,
          padding: 0,
          border: 0,
          textAlign,
          color,
          backgroundColor
        }
      };
      switch (jsonElement.format) {
        case 'h1':
          htmlElement = (
            <input
              id="dragInput"
              type="text"
              style={styles.h1}
              size={size - 5}
              maxLength={45}
              defaultValue={jsonElement.value}
              onChange={(e) => this.props.onInputChange(e)}
              onBlur={(e) => this.props.onContainerClick(e)}
              className={transition}
              autoComplete="off"
            ></input>
          );
          break;
        case 'h2':
          htmlElement = (
            <input
              id="dragInput"
              type="text"
              style={styles.h2}
              size={size - 5}
              maxLength={45}
              defaultValue={jsonElement.value}
              onChange={(e) => this.props.onInputChange(e)}
              onBlur={(e) => this.props.onContainerClick(e)}
              className={transition}
              autoComplete="off"
            ></input>
          );
          break;
        case 'h3':
          htmlElement = <h3>{jsonElement.value}</h3>;
          break;
        default:
          //this by default p tag element
          htmlElement = (
            <textarea
              id="dragInput"
              style={styles.p}
              // className="custom-textarea"
              defaultValue={jsonElement.value}
              cols="50"
              rows="4"
              wrap="off"
              className={transition}
              onChange={(e) => this.props.onInputChange(e)}
              onBlur={(e) => this.props.onContainerClick(e)}
            ></textarea>
          );
      }
    } else if (jsonElement.type === 'image') {
      const width = 'width' in jsonElement ? jsonElement.width : 200;
      const height = 'height' in jsonElement ? jsonElement.height : 200;
      // console.log('Image Element', jsonElement);
      htmlElement = (
        <img
          width={width}
          height={height}
          id="dragInput"
          alt="test"
          src={jsonElement.url}
        />
      );
    }
    return htmlElement;
  };

  render() {
    return this.getHTML(this.props.jsonElement);
  }
}

export default TextElement;
// `<` +
// jsonElement.format +
// ' key=' +
// jsonElement.id +
// ' style={{ color: "black" }}>' +
// jsonElement.value +
// '</' +
// jsonElement.format +
// '>'
