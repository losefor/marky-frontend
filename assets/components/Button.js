import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Spinner from './Spinner'
export default function Button({
  onClick,
  label,
  type,
  color,
  leftIcon,
  rightIcon,
  rounded,
}) {
  return (
    <button
      type={type}
      className={`button button--${color} ${rounded && "button--rounded"} `}
      onClick={onClick}
    >
      {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
      {label && <span style={{ margin: "0 80px" }}>{label}</span>}
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </button>
  );
}
