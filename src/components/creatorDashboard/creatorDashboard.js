import React, { Component } from 'react';
import './creatorDashboard.css';
import Deck from './deck';
import { connect } from 'react-redux';
import {
  getUserDecks,
  createDeck,
  setDeckId,
  fetchUserDetails,
  deleteDeck
} from '../../actions/userStateActions';
import Loader from '../loading/loading';

export class creatorDashboard extends Component {
  state = {
    show: false,
    name: ' ',
    decks: [],
    title: '',
    desc: '',
    Loader: false
  };
  componentDidMount = () => {
    // this.props.getUserDecks(this.props.user);
    this.setState({ Loader: !this.state.Loader });
    this.props.fetchUserDetails(this.props.match.params.uid);
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.user !== this.props.user) {
      console.log('In didUpdate Dashboard');
      this.setState({ name: this.props.user.displayName });
      this.props.getUserDecks(this.props.user);
    }
    if (this.props.decks !== prevProps.decks) {
      // console.log(this.props);
      this.setState({
        name: this.props.user.displayName,
        decks: this.props.decks,
        Loader: !this.state.Loader
      });
    }
    if (
      prevProps.currentWorkingDeckId !== this.props.currentWorkingDeckId &&
      this.state.Loader
    ) {
      const url =
        '/' +
        this.props.user.uid +
        '/' +
        this.props.currentWorkingDeckId +
        '/edit';
      // this.props.history.replace('/edit');
      this.setState({ Loader: !this.state.Loader });
      this.props.history.replace(url);
    }
  };

  render() {
    let dropdowndiv = this.generateDropdown(this.state.show);
    console.log(this.props.decks);
    const icon = this.state.name;
    const decks = this.state.decks;

    // console.clear();
    // decks.map((deck) => console.log('1'));
    let userDecks = <div></div>;
    if (this.props.decks) {
      userDecks = decks.map((deck) => {
        const preview = deck.slides === undefined ? null : deck.slides[0];
        return (
          <Deck
            key={deck}
            deck={deck}
            title={deck.title}
            description={deck.description}
            previewSlide={preview}
            id={deck.idDeck}
            deleteDeck={this.deleteDeck}
            editDeck={this.editDeck}
            viewDeck={this.viewDeck}
          ></Deck>
        );
      });
    }

    let profileHolder = this.state.Loader ? (
      <div className="loader-holder">
        <Loader></Loader>
      </div>
    ) : (
      <div className="profile-holder">
        <div className="profile-name">
          <div className="letter-icon">{icon[0]}</div>
          <h2 className="name">{this.state.name}</h2>
        </div>
        {userDecks}
      </div>
    );
    return (
      <div className="dashboard-body">
        {' '}
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <img
              src={require('../assets/icons/slides-logo-blackbg.png')}
              width="120px"
              height="50px"
              alt="Slides"
            ></img>
          </a>
          <div>
            <button
              className="btn btn-outline-light"
              onClick={this.createNewDeck}
            >
              + New Deck
            </button>
            <button className="btn btn-outline-light" onClick={this.signOut}>
              Logout
            </button>
          </div>
        </nav>
        {dropdowndiv}
        {profileHolder}
      </div>
    );
  }
  editDeck = (idDeck) => {
    console.log(idDeck);
    this.props.setDeckId(idDeck);
    let url = `/${this.props.user.uid}/${idDeck}/edit`;
    // this.props.history.replace('/edit');
    this.props.history.replace(url);
  };
  deleteDeck = (idDeck) => {
    // Do stuff

    this.setState({ Loader: !this.state.Loader });
    this.props.deleteDeck(idDeck, this.props.decks);
  };
  // viewDeck = (idDeck) => {
  //   // Do stuff
  // };
  signOut = () => {
    //   signout user
    this.props.history.replace('/');
  };
  createNewDeck = () => {
    // console.log('clicked');
    this.setState({ show: !this.state.show });
    // this.props.createDeck(this.props.user, 'New deck desc', 'created via app');
  };
  onCancel = () => {
    this.setState({ show: !this.state.show, title: '', desc: '' });
  };
  titleUpdate = (e) => {
    this.setState({ title: e.target.value });
  };
  descUpdate = (e) => {
    this.setState({ desc: e.target.value });
    console.log(this.state.desc, this.state.title);
  };
  addDeck = (e) => {
    e.preventDefault();
    if (this.state.title === '' || this.state.desc === '') {
      alert('Provide title and description');
    } else {
      this.props.createDeck(this.props.user, this.state.desc, this.state.title);
      this.setState({ show: !this.state.show });
      this.setState({ Loader: !this.state.Loader });
      // this.props.history.replace('/edit');
    }
  };
  generateDropdown = (isTrue) => {
    return isTrue ? (
      <div className="deck-details-container">
        <div className="form">
          <form onSubmit={this.addDeck}>
            <div>
              <label>Deck Title</label>
              <input
                style={{ position: 'relative', left: '3%' }}
                name="title"
                value={this.state.title}
                placeholder="Title..."
                onChange={this.titleUpdate}
              ></input>
            </div>
            <div>
              <label>Description</label>
              <input
                name="description"
                value={this.state.desc}
                placeholder="description..."
                onChange={this.descUpdate}
              ></input>
            </div>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={this.onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-outline-success float-right"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    ) : null;
  };
}
const mapStateToProps = (state) => ({
  decks: state.user.userdecks,
  user: state.user.user,
  currentWorkingDeckId: state.user.currentWorkingDeckId
});

export default connect(
  mapStateToProps,
  { getUserDecks, createDeck, setDeckId, fetchUserDetails, deleteDeck }
)(creatorDashboard);
