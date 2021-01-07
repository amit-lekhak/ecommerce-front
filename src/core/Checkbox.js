import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const toggleHandler = (id) => () => {
    const clickedInputId = checked.indexOf(id);
    const newCheckedState = [...checked];
    if (clickedInputId === -1) {
      newCheckedState.push(id);
    } else {
      newCheckedState.splice(clickedInputId, 1);
    }
    setChecked(newCheckedState);
    handleFilters(newCheckedState);
  };

  return categories.map((category, index) => {
    return (
      <li key={index} className="list-unstyled">
        <input
          onChange={toggleHandler(category._id)}
          value={checked.indexOf(category._id) !== -1}
          type="checkbox"
          className="form-check-input"
        />
        <label className="form-check-label">{category.name}</label>
      </li>
    );
  });
};

export default Checkbox;
