import { useState, useEffect } from "react";

import Modal from "./Modal";
import UserItem from "./UserItem";
import Text from "./Text";
import View from "./View";

export default function Picker({
  items,
  value,
  label = "no label provided",
  onChange,
  textAlign,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(value);

  useEffect(() => {
    const item = items.filter((data) => {
      return data.value == value;
    });

    // console.log(items, item);

    setIsSelected(item[0]);
  }, []);

  const closeHandler = () => {
    setIsOpen((value) => !value);
  };

  const selectHandler = (data) => {
    setIsOpen(false);
    setIsSelected(data);
    onChange(data);
  };
  return (
    <div>
      <View
        display="flex"
        alignItems="center"
        pv={1}
        flexDirection="row-reverse"
        // flexWrap='wrap'
      >
        <View ph={1}>
          <Text>{label}</Text>
        </View>

        <div
          style={{ width: "10rem" , fontSize:'1.1rem' }}
          className="picker"
          onClick={closeHandler}
        >
          {isSelected  ? isSelected.name : "لم يتم التحديد"}
        </div>
      </View>
      <Modal open={isOpen} onClose={closeHandler}>
        {items &&
          items.map((data, index) => (
            <UserItem
              textAlign={textAlign}
              pv={1}
              ph={5}
              key={index}
              name={data.name}
              onClick={() => selectHandler(data)}
            />
          ))}
      </Modal>
    </div>
  );
}
