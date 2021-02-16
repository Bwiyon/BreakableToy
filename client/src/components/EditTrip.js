import React, { useState } from "react";

const EditTrip = (props) => {
  const [form, setForm] = useState({ name: "" });

  const handleInput = (event) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = () => {
    props.handleEditSubmit(form);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span className="label base">Name of trip</span>
          <input type="text" name="name" value={form.name} onChange={handleInput}></input>
        </label>
        <button className="button success hollow" type="submit">
          Edit Trip
        </button>
      </form>
    </div>
  );
};

export default EditTrip;
