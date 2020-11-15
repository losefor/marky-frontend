import {useEffect , useState} from 'react'
import { useFormikContext } from "formik";
import Picker from "../Picker";

export default function FormPicker({ items, name, label, textAlign }) {
  const { setFieldValue, errors, touched , values } = useFormikContext();
  const [isSelected , setIsSelected] = useState({})

  useEffect(()=>{
    console.log(values[name])
    console.log(items)

    const item = items.find(data=>(data.value == values[name]))
    console.log(item)
    setIsSelected(item)
  } , [])
  
  
  return (
    <div>
      <Picker
        textAlign={textAlign}
        label={label}
        items={items}
        value={isSelected}
        onChange={(data) => setFieldValue(name, data)}
      />
      {touched[name] && errors[name] && (
        <label
          style={{
            textAlign: "right",
            width: "100%",
            fontSize: "1.1rem",
            color: "tomato",
            display: "block",
            paddingRight: "1rem",
          }}
        >
          {errors[name]}
        </label>
      )}
    </div>
  );
}
