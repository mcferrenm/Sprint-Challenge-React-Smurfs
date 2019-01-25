import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav";
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

  deleteSmurfs = id => {
    axios
      .delete(`${BASE_URL}/smurfs/${id}`)
      .then(res => this.setState(() => ({ smurfs: res.data })))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Nav />
        <Route
          exact
          path="/"
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurfs={this.deleteSmurfs}
            />
          )}
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
