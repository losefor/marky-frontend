import {useEffect , useState} from 'react'
import { useFormikContext } from "formik";
import Picker from "../Picker";

export default function FormPicker({ items, name, label, textAlign }) {
  const { setFieldValue, errors, touched , values } = useFormikContext();
  // const [isSelected , setIsSelected] = useState({})

 
  
  return (
    <div>
      {/* {console.log(isSelected)} */}
      <Picker
        textAlign={textAlign}
        label={label}
        items={items}
        value={values[name]}
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
