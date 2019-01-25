import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

const BASE_URL = "http://localhost:3333";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    this.getSmurfs();
  }

  getSmurfs = () => {
    axios
      .get(`${BASE_URL}/smurfs`)
      .then(res => this.setState(() => ({ smurfs: res.data })))
      .catch(err => console.log(err));
  };

  postSmurfs = smurf => {
    axios
      .post(`${BASE_URL}/smurfs`, smurf)
      .then(res => this.setState(() => ({ smurfs: res.data })))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />
        <Route
          path="/smurf-form"
          render={props => (
            <SmurfForm {...props} postSmurfs={this.postSmurfs} />
          )}
        />
      </div>
    );
  }
}

export default App;
