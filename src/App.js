import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/authentication/login";
import CreateAccount from "./components/authentication/createAccount";
import { Provider } from "react-redux";
import store from "./store";
import Edit from "./components/Edit";
import CreatorDashboard from "./components//creatorDashboard/creatorDashboard";
import Loading from "./components/loading/loading";
import Explore from "./components/Explore/Explore";
import Preview from "./components/Preview/Preview";
import AutoSlideShow from "./components/AutoSlideShow/AutoSlideShow";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app-container">
          <Router>
            <Route
              exact
              path="/explore"
              render={props => <Explore {...props} />}
            />
            <Route
              exact
              path="/preview/:id"
              render={props => <Preview {...props} />}
            />
            <Route
              exact
              path="/autoSlideshow/:id"
              render={props => <AutoSlideShow {...props} />}
            />
            <Route exact path="/" render={props => <Homepage {...props} />} />
            <Route
              exact
              path="/users/sign_in"
              render={props => <Login {...props} />}
            />
            <Route
              exact
              path="/users/sign_up"
              render={props => <CreateAccount {...props} />}
            />
            <Route
              exact
              path="/:uid/:idDeck/edit"
              render={props => <Edit {...props} />}
            />
            <Route
              exact
              path="/:uid/dashboard"
              render={props => <CreatorDashboard {...props} />}
            />
            <Route
              exact
              path="/loading"
              render={props => <Loading {...props} />}
            />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
