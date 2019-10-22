import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './createAccount.css';
import { connect } from 'react-redux';
import { createUser } from '../../actions/userStateActions';
import Loader from '../loading/loading';

export class CreateAccount extends Component {
  state = { name: '', email: '', password: '', Loader: false };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.props.history.replace(`/${this.props.user.uid}/dashboard`);
    }
  }
  render() {
    let body = this.state.Loader ? (
      <Loader></Loader>
    ) : (
      <div className="signUp-container shadow">
        <input
          className="form-control"
          type="text"
          placeholder="Name"
          onChange={this.onNameInput}
        ></input>
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          onChange={this.onEmailInput}
        ></input>
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          onChange={this.onPasswordInput}
        ></input>

        <button
          type="button"
          className="btn btn-outline-success"
          onClick={this.signUpClicked}
        >
          Sign Up
        </button>
      </div>
    );
    return (
      <div className="container">
        <img
          className="logo float-left"
          src={require('../assets/icons/slides-icon.png')}
          alt="no img"
        ></img>
        <Link to="/users/sign_in">
          <button type="button" className="btn btn-outline-dark float-right">
            Login
          </button>
        </Link>

        <div className="signUp-body">
          <h3>Create an account</h3>
          {body}
        </div>
      </div>
    );
  }
  onNameInput = (e) => {
    this.setState({ name: e.target.value });
  };
  onEmailInput = (e) => {
    this.setState({ email: e.target.value });
  };
  onPasswordInput = (e) => {
    this.setState({ password: e.target.value });
  };
  signUpClicked = async (e) => {
    let name = this.state.name;
    if (!name.replace(/\s/g, '').length) {
      alert('Provide a name');
    } else if (name.split('')[0] === ' ') {
      alert("Name can't start with a space");
    } else if (
      name.charCodeAt(0) < 65 ||
      (name.charCodeAt(0) > 90 && name.charCodeAt(0) < 97) ||
      name.charCodeAt(0) > 122
    ) {
      alert('Provide a name');
    } else {
      this.setState({ Loader: !this.state.Loader });
      await this.props.createUser(
        this.state.name,
        this.state.email,
        this.state.password
      );
      // this.props.history.replace('/dashboard');
    }
  };
}

const mapStatetoProps = (state) => ({
  user: state.user.user
});

export default connect(
  mapStatetoProps,
  { createUser }
)(CreateAccount);
