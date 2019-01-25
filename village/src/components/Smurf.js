import React from "react";

const Smurf = props => {
  return (
    <div className="smurf">
      <h3>{props.name}</h3>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
      <div className="buttons">
        <button onClick={() => props.deleteSmurf(props.id)}>Delete</button>
        <button onClick={() => props.editSmurf(props.id)}>Edit</button>
      </div>
    </div>
  );
};

Smurf.defaultProps = {
  name: "",
  height: "",
  age: ""
};

export default Smurf;
