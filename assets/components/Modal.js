import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default function Modal({ children, open, onClose }) {
  return (
    <div
      onClick={() => onClose()}
      className={`modal-cont ${open ? "modal-cont--open" : ""}`}
    >
      <div onClick={(e)=>e.stopPropagation()} className={`modal ${open ? "modal--open" : ""}`}>
        {onClose ? (
          <FontAwesomeIcon
            onClick={onClose}
            className="modal__close"
            icon={faTimes}
          />
        ) : null}
        {children}
      </div>
    </div>
  );
}
