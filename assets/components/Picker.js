import { useState , useEffect } from "react";

import Modal from "./Modal";
import UserItem from "./UserItem";

export default function Picker({
  items,
  value,
  label = "no label provided",
  onChange,
  textAlign,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(value);

  const closeHandler = () => {
    setIsOpen((value) => !value);
  };

  const selectHandler = (data) => {
    setIsOpen(false);
    setIsSelected(data);
    onChange(data);
  };
  console.log(isSelected)
  return (
    <div>
      <div className="picker__label">{label}</div>
      <div className="picker" onClick={closeHandler}>
         {isSelected.name} 
      </div>
      <Modal open={isOpen} onClose={closeHandler}>
        {items &&
          items.map((data, index) => (
            <UserItem
              textAlign={textAlign}
              pv={1}
              key={index}
              name={data.name}
              onClick={()=>selectHandler(data)}
            />
          ))}
      </Modal>
    </div>
  );
}
