import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import SmurfDetails from "./components/SmurfDetails";

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

  addSmurf = () => {
    axios
      .post(`${BASE_URL}/smurfs`, this.state.smurf)
      .then(res => {
        this.setState(() => ({ smurfs: res.data }));
        this.setState({
          smurf: CLEARED_SMURF
        });

        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  deleteSmurf = id => {
    axios
      .delete(`${BASE_URL}/smurfs/${id}`)
      .then(res => {
        this.setState(() => ({ smurfs: res.data }));
        this.props.history.push("/");
      })
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
        this.setState({
          smurf: CLEARED_SMURF,
          isUpdating: false
        });
      })
      .catch(err => console.log(err));
  };

  editSmurf = id => {
    this.props.history.push("/smurf-form");

    const smurf = this.state.smurfs.find(smurf => smurf.id === id);

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

  cancelEdit = () => {
    this.setState({
      smurf: CLEARED_SMURF,
      isUpdating: false
    });
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
        <Nav isUpdating={this.state.isUpdating} />
        <Route
          exact
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />
        <Route
          path="/smurf/:id"
          render={props => (
            <SmurfDetails
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
              cancelEdit={this.cancelEdit}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
