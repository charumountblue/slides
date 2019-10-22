import React, { Component } from "react";
import Header from "../Homepage/Header";
import "./Explore.css";
import SearchInput from "./Search";
import filterDecks from "./filterDecks";
import DeckResults from "./DeckResults";
import { fetchAllDecks } from "../../actions/userStateActions";
import { connect } from "react-redux";

class explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredDecks: [],
      isFetching: false,
    };
  }

  handleSearchChange = event => {
    this.setState({
      filteredDecks: filterDecks(event.target.value, 20, this.props.viewDecks)
    });
  };

  componentDidMount() {
    // console.log("deckkssssssss");
    this.setState({ isFetching: true })
    this.props.fetchAllDecks();
    this.setState({ filteredDecks: [...this.props.viewDecks] });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("state:",this.props.viewDecks)
    // console.log(prevProps, this.props, prevState, this.state.filteredDecks);
    if (prevProps.viewDecks !== this.props.viewDecks) {
      this.setState({ filteredDecks: [...this.props.viewDecks] });
      // console.log("update", this.state.filteredDecks);
      this.setState({isFetching: false})
    }
  }

  render() {
    console.log("render state", this.state);
    return (
      <div>
        <Header />
        <SearchInput textChange={this.handleSearchChange} />
        <svg
          className="marketing-section-curve"
          viewBox="0 0 1000 40"
          height="40"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L 1000,0 S 500,0 0,40" fill="#358eef"></path>
        </svg>
        {(this.state.isFetching === false) ?
        <div><DeckResults deckData={this.state.filteredDecks}/></div>
        : <div className="loading-logo"><img src="/loading-preview.gif" alt="Loading"></img></div>}
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  viewDecks: state.user.viewDecks
});

export default connect(
  mapStateToProps,
  { fetchAllDecks }
)(explore);
