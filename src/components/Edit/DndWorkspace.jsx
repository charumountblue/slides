import React, { Component } from 'react';
import Container from './Container';
import TargetBlockDelete from './TargetBlockDelete';

class DragAroundNaive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideSourceOnDrag: true,
      workspace: this.props.workspace || []
    };
  }

  componentDidMount() {
    this.setState({ workspace: this.props.workspace });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps);
    if (prevProps.workspace !== this.props.workspace) {
      this.setState({ workspace: this.props.workspace });
    }
  }

  setHideSourceOnDrag = (setting) =>
    this.setState({ hideSourceOnDrag: setting });

  toggle = () => this.setHideSourceOnDrag(!this.state.hideSourceOnDrag);

  render() {
    return (
      <div>
        <Container
          workspace={this.props.workspace}
          hideSourceOnDrag={this.hideSourceOnDrag}
          onBlockMove={this.props.onBlockMove}
          onDoubleClickEvent={this.props.onDoubleClickEvent}
          onInputChange={this.props.onInputChange}
          onContainerClick={this.props.onContainerClick}
          onDeleteBlock={this.props.onDeleteBlock}
          slide={this.props.slide}
          onContainerBodyClicked={this.props.onContainerBodyClicked}
        />
        <TargetBlockDelete />
        {/* <p>
          <label htmlFor="hideSourceOnDrag">
            <input
              id="hideSourceOnDrag"
              type="checkbox"
              checked={this.hideSourceOnDrag}
              onChange={this.toggle}
            />
            <small>Hide the source item while dragging</small>
          </label>
        </p> */}
      </div>
    );
  }
}

export default DragAroundNaive;
