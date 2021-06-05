import React from "react";
import PropTypes from "prop-types";

import InputLabel from "../../Forms/CreateListingForm/InputLabel";

const Input = props => {
  const { type, value, onRef, onChange, className } = props;

  return (
    <div className="form-group">
      <label htmlFor="defaultInput">
        <InputLabel label={props.label} />
      </label>
      {type === "textarea"
        ? renderTextArea(value, onRef, onChange, className)
        : renderNormalInput(type, value, onRef, onChange, className)}
    </div>
  );
};

const renderNormalInput = (type, value, onRef, onChange, className) => (
  <input
    type={type ? type : "text"}
    className={`form-control text-dark create-listing-input ${className}`}
    id="defaultInput"
    value={value || ""}
    ref={onRef}
    onChange={onChange}
  />
);

const renderTextArea = (value, onRef, onChange, className) => (
  <textarea
    className={`form-control text-dark create-listing-input ${className}`}
    id="defaultInput"
    value={value || ""}
    ref={onRef}
    onChange={onChange}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onRef: PropTypes.func,
  onChange: PropTypes.func.isRequired
};

export default Input;
