import { useState } from "react";

export default function DoubleSwitch({ value = null, onChange }) {
  const [isSuccess, setIsSuccess] = useState(value)
  const clickHandler = () => {
    setIsSuccess((value) => {
      onChange(!value)
      return !value
    });
    
  };
  return (
    <div
      onClick={clickHandler}
      className={`check ${isSuccess ? "check--success" : "check--danger"}`}
    />
  );
}
