import React from "react";
import { Link } from "react-router-dom";

import Smurf from "./Smurf";

const Smurfs = props => {
  return (
    <div className="smurfs">
      <ul>
        {props.smurfs.map(smurf => {
          return (
            <Link to={`/smurf/${smurf.id}`} key={smurf.id}>
              <Smurf
                name={smurf.name}
                id={smurf.id}
                age={smurf.age}
                height={smurf.height}
                key={smurf.id}
                deleteSmurf={props.deleteSmurf}
                editSmurf={props.editSmurf}
              />
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

Smurf.defaultProps = {
  smurfs: []
};

export default Smurfs;
