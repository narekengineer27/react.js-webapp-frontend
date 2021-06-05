import React from "react";
import PropTypes from "prop-types";

const InputGroupTitle = ({ title }) => (
  <div className="mt-5 pt-2">
    <span className="input-group-title main-color font-weight-bold">
      {title}
    </span>
  </div>
);

InputGroupTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default InputGroupTitle;
