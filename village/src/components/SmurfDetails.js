import React from "react";

import Smurf from "./Smurf";

const SmurfDetails = props => {
  const { id } = props.match.params;

  const smurf = props.smurfs[id];

  if (!smurf) return <h2>Cannot find that smurf!</h2>;

  return (
    <div className="smurf-details">
      <Smurf
        name={smurf.name}
        id={smurf.id}
        age={smurf.age}
        height={smurf.height}
        key={smurf.id}
        deleteSmurf={props.deleteSmurf}
        editSmurf={props.editSmurf}
      />
      <div className="buttons">
        <button onClick={() => props.deleteSmurf(smurf.id)}>Delete</button>
        <button onClick={() => props.editSmurf(smurf.id)}>Edit</button>
      </div>
    </div>
  );
};

export default SmurfDetails;
