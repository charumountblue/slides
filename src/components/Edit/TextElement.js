import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

class TextElement extends Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = { html: '', input: '' };
  }

  createHTML = () => {
    const { jsonElement } = this.props;
    const htmlTag =
      `<` +
      jsonElement.format +
      ' key=' +
      jsonElement.id +
      ' style={{ color: "black" }}>' +
      jsonElement.value +
      '</' +
      jsonElement.format +
      '>';
    return htmlTag;
  };

  componentDidMount() {
    this.setState({ html: this.createHTML(this.props.jsonElement) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.jsonElement.value !== this.props.jsonElement.value) {
      this.setState({ html: this.createHTML(this.props.jsonElement) });
    }
  }
  getHTML = (jsonElement) => {
    const { textAlign } = jsonElement;
    const size = jsonElement.value.length;
    let htmlElement = null;
    const color = 'color' in jsonElement ? jsonElement.color : 'red';
    console.log('Size Of Input', size, jsonElement);
    const styles = {
      h1: {
        display: 'block',
        fontSize: '2em',
        marginLeft: 0,
        marginRight: 0,
        fontWeight: 'bold',
        padding: 0,
        border: 0,
        textAlign,
        color: color,
      },
      h2: {
        display: 'block',
        fontSize: '1.5em',
        marginLeft: 0,
        marginRight: 0,
        fontWeight: 'bold',
        padding: 0,
        border: 0,
        textAlign,
        color: color,
      },
      p: {
        display: 'block',
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
        border: 0,
        textAlign,
        color: color,
      },
    };
    if (jsonElement.type === 'text') {
      switch (jsonElement.format) {
        case 'h1':
          htmlElement = (
            <input
              type="text"
              style={{ ...styles.h1, color: 'red' }}
              size={size - 5}
              maxLength={45}
              defaultValue={jsonElement.value}
              onChange={(e) => this.props.onInputChange(e)}
            ></input>
          );
          break;
        case 'h2':
          htmlElement = (
            <input
              type="text"
              style={styles.h2}
              size={size - 5}
              maxLength={45}
              defaultValue={jsonElement.value}
              onChange={(e) => this.props.onInputChange(e)}
            ></input>
          );
          break;
        case 'h3':
          htmlElement = <h3>{jsonElement.value}</h3>;
          break;
        default:
          htmlElement = (
            <textarea
              style={styles.p}
              defaultValue={jsonElement.value}
              cols="50"
              rows="4"
              onChange={(e) => this.props.onInputChange(e)}
            ></textarea>
          );
      }
    }
    return htmlElement;
  };

  handleChangeInput = (e) => {
    const htmlVal = e.target.value;
    const result = htmlVal.replace(/<[^>]+>/g, '');
    this.setState({ html: e.target.value, input: result });
  };

  render() {
    // return this.getHTML(this.props.jsonElement);
    return (
      <ContentEditable
        innerRef={this.contentEditable}
        html={this.state.html} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={(e) => this.handleChangeInput(e)}
        onBlur={(e) => this.props.onInputChange(e, this.state.input)} // handle innerHTML change
        tagName="article" // Use a custom HTML tag (uses a div by default)
      />
    );
  }
}

export default TextElement;
