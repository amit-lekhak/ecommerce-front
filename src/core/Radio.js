import React, { useState } from "react";

const Radio = ({ prices,handleFilters }) => {

  // eslint-disable-next-line
    const [value,setValue] = useState(0);

  const onChangeHandler = (event) => {
    
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((price, index) => {
    return (
      <div key={index}>
        <input
          onChange={onChangeHandler}
          value={`${price._id}`}
          type="radio"
          name={price}
          className="ml-4 mr-2"
        />
        <label className="form-check-label">{price.name}</label>
      </div>
    );
  });
};

export default Radio;
