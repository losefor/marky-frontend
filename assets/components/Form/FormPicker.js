import {useEffect , useState} from 'react'
import { useFormikContext } from "formik";
import Picker from "../Picker";

export default function FormPicker({ items, name, label, textAlign }) {
  const { setFieldValue, errors, touched , values } = useFormikContext();
  
  return (
    <div style={{width:'300px'}}>
      <Picker
        textAlign={textAlign}
        label={label}
        items={items}
        value={values[name]}
        onChange={(data) => setFieldValue(name, data.value)}
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
