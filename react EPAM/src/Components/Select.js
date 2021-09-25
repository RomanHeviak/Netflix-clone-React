import React from "react";

const Select = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      className="sortbtn"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option value={option.value}>{option.name}</option>
      ))}
    </select>
  );
};

export default Select;
