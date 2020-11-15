import React from "react";
import { useFormikContext } from "formik";
import TextInput from "../TextInput";
export default function FormTextInput({ name, label }) {
  const { handleChange, errors, touched, values } = useFormikContext();
  // console.log(values[name])
  return (
    <div>
      <TextInput
        error={errors[name]}
        touched={touched[name]}
        label={label}
        value={values[name]}
        onChange={handleChange(name)}
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
