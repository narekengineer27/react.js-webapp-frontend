import React from "react";
import PropTypes from "prop-types";

const InputLabel = ({ label }) => (
  <div className="mt-4 mb-1">
    <h6 className="input-label font-weight-bold">{label}</h6>
  </div>
);

InputLabel.propTypes = {
  label: PropTypes.string.isRequired
};

export default InputLabel;
