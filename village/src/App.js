import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

const BASE_URL = "http://localhost:3333";

const CLEARED_SMURF = {
  name: "",
  age: "",
  height: ""
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      smurf: {
        name: "",
        age: "",
        height: ""
      }
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

  deleteSmurf = id => {
    axios
      .delete(`${BASE_URL}/smurfs/${id}`)
      .then(res => this.setState(() => ({ smurfs: res.data })))
      .catch(err => console.log(err));
  };

  updateSmurfs = (id, smurf) => {
    console.log(id, smurf);
    // axios
    //   .put(`${BASE_URL}/smurfs/${id}`, smurf)
    //   .then(res => this.setState(() => ({ smurfs: res.data })))
    //   .catch(err => console.log(err));
  };

  editSmurf = id => {
    console.log(id);
  };

  addSmurf = event => {
    event.preventDefault();

    this.postSmurfs(this.state.smurf);

    this.setState(CLEARED_SMURF);

    this.props.history.push("/");
  };

  handleInputChange = e => {
    e.persist();
    this.setState(prevState => {
      return {
        smurf: {
          ...prevState.smurf,
          [e.target.name]: e.target.value
        }
      };
    });
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
              deleteSmurf={this.deleteSmurf}
              editSmurf={this.editSmurf}
            />
          )}
        />
        <Route
          path="/smurf-form"
          render={props => (
            <SmurfForm
              {...props}
              addSmurf={this.addSmurf}
              handleInputChange={this.handleInputChange}
              updateSmurfs={this.updateSmurfs}
              smurf={this.state.smurf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
