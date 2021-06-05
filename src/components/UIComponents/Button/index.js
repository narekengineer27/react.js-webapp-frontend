import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const {
    onClick,
    title,
    className,
    outline,
    icon,
    size,
    color,
    borderColor
  } = props;

  let btnSizeStyle = getBtnSizeStyle(size);
  let newClassName = getClassName(
    className,
    outline,
    btnSizeStyle,
    borderColor
  );
  let style = color ? { color: color } : {};

  return (
    <div className={newClassName} style={style} onClick={onClick}>
      {icon ? (
        <div>
          <i className={icon}></i>
        </div>
      ) : null}
      <strong>{title}</strong>
    </div>
  );
};

const getBtnSizeStyle = size => {
  let btnSizeStyle;

  switch (size) {
    case "sm":
      btnSizeStyle = "pt-1 pb-1 pl-3 pr-3 ";
      break;
    case "lg":
      btnSizeStyle = "pt-3 pb-3 pl-4 pr-4 ";
      break;
    default:
      btnSizeStyle = "pt-2 pb-2 pl-4 pr-4 ";
      break;
  }

  return btnSizeStyle;
};

const getClassName = (className, outline, btnSizeStyle, borderColor) => {
  return (
    (className ? className : "") +
    " ml-1 plastplace-button" +
    (outline ? "-outline " : " ") +
    btnSizeStyle +
    (borderColor ? "border-" + borderColor + " hover-no-bg-effect " : "")
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  outline: PropTypes.bool,
  icon: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string
};

export default Button;
