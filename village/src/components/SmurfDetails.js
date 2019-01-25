import React from "react";

import Smurf from "./Smurf";

const SmurfDetails = props => {
  const { id } = props.match.params;

  const smurf = props.smurfs[id];

  if (!smurf) return <h2>Cannot find that smurf!</h2>;

  return (
    <Smurf
      name={smurf.name}
      id={smurf.id}
      age={smurf.age}
      height={smurf.height}
      key={smurf.id}
      deleteSmurf={props.deleteSmurf}
      editSmurf={props.editSmurf}
    />
  );
};

export default SmurfDetails;
