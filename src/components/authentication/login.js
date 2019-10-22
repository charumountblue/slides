import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import firebase from '../fibebase';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/userStateActions';
import Loader from '../loading/loading';

// import icon from '../assets/icons/slides-icon.png';
export class Login extends Component {
  state = { email: '', password: '', Loader: false };
  componentDidMount = () => {
    // console.log(this.props.user);
  };
  render() {
    let body = this.state.Loader ? (
      <Loader></Loader>
    ) : (
      <div className="login-container shadow">
        <input
          type="email"
          className="form-control shadow"
          placeholder="Email"
          onChange={this.onEmailInput}
        ></input>
        <input
          type="password"
          className="form-control shadow"
          placeholder="Password"
          onChange={this.onPasswordInput}
        ></input>
        <button
          type="button"
          className="btn btn-outline-success login-btn"
          onClick={this.loginClicked}
        >
          Log in
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
        <Link to="/users/sign_up">
          {' '}
          <button type="button" className="btn btn-outline-dark float-right">
            Sign up
          </button>
        </Link>
        <div className="login-body">
          <h3>Welcome back!</h3>
          <h5>Let's get you signed in</h5>
          {body}
        </div>
      </div>
    );
  }
  loginClicked = async () => {
    try {
      this.setState({ Loader: true });
      await firebase.login(this.state.email, this.state.password);
      // this.props.history.replace('/users/sign_in');
      await this.props.fetchUser();
      // await this.props.getUserDecks();
      // console.log(this.props);
      console.log('user Deatil while moving to dashboard:', this.props.user);
      this.props.history.replace('/' + this.props.user.uid + '/dashboard');
    } catch (err) {
      alert(err.message);
      this.setState({ Loader: false });
    }
  };
  onEmailInput = (e) => {
    this.setState({ email: e.target.value });
  };
  onPasswordInput = (e) => {
    this.setState({ password: e.target.value });
  };
}

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(Login);
