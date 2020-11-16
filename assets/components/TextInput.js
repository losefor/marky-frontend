import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function TextInput({
  icon,
  label = "default label",
  width='300px',
  onChange,
  error,
  touched,
  value
}) {
    const inputHandler = (e)=>{
        onChange(e.target.value)
    }
  return (
    <div className='input-cont'  style={{width}}>
      <div style={{width}} className="input__label">{label}</div>
      <div style={{width }} className="input">
       {icon && <FontAwesomeIcon className='input__icon' icon={icon} />} 
        <input value={value} style={{padding: icon ? '' : '0px 10px' , borderColor : error && touched && 'tomato'}} onChange={inputHandler} />
      </div>
    </div>
  );
}
