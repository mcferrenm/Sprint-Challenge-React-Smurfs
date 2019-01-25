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
        height: "",
        id: ""
      },
      isUpdating: false
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

  updateSmurf = id => {
    const smurf = {
      ...this.state.smurf
    };

    axios
      .put(`${BASE_URL}/smurfs/${id}`, smurf)
      .then(res => {
        this.setState(() => ({ smurfs: res.data }));
        this.props.history.push("/");
        this.setState(CLEARED_SMURF);
      })
      .catch(err => console.log(err));
  };

  editSmurf = id => {
    this.props.history.push("/smurf-form");

    const smurf = this.state.smurfs[id];

    this.setState({
      smurf: {
        name: smurf.name,
        age: smurf.age,
        height: smurf.height,
        id: smurf.id
      },
      isUpdating: true
    });
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
              smurf={this.state.smurf}
              addSmurf={this.addSmurf}
              handleInputChange={this.handleInputChange}
              isUpdating={this.state.isUpdating}
              updateSmurf={this.updateSmurf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
