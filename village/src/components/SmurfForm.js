import React from "react";

const SmurfForm = props => {
  function handleSubmit(e) {
    e.preventDefault();
    if (props.isUpdating) {
      props.updateSmurf(props.smurf.id);
    } else {
      props.addSmurf();
    }
  }

  return (
    <div className="smurf-form">
      <form onSubmit={handleSubmit}>
        <input
          onChange={props.handleInputChange}
          placeholder="name"
          value={props.smurf.name}
          name="name"
        />
        <input
          onChange={props.handleInputChange}
          placeholder="age"
          value={props.smurf.age}
          name="age"
        />
        <input
          onChange={props.handleInputChange}
          placeholder="height"
          value={props.smurf.height}
          name="height"
        />
        <button type="submit">{props.isUpdating ? "Update" : "Add"}</button>
        <button onClick={props.cancelEdit}>Cancel</button>
      </form>
    </div>
  );
};

export default SmurfForm;
