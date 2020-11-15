import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Button({
  onClick,
  label = "no text provided",
  type,
  color,
  leftIcon,
  rightIcon,
  rounded
}) {
  return (
    <button type={type} className={`button button--${color} ${rounded && 'button--rounded'} `} onClick={onClick}>
    {leftIcon && <FontAwesomeIcon icon={leftIcon}/>}
          <span style={{margin:'0 10px'}}>{label}</span>
    {rightIcon && <FontAwesomeIcon icon={rightIcon}/>}
    
    </button>
  );
}
