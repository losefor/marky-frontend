import React from "react";
import { useFormikContext } from "formik";
import TextInput from "../TextInput";
import View from "../View";
export default function FormTextInput({ name, label , type }) {
  const { handleChange, errors, touched, values } = useFormikContext();
  // console.log(values[name])
  return (
    <View display='flex' flexDirection='column'  style={{width:'300px'}}>
      <TextInput
        error={errors[name]}
        touched={touched[name]}
        label={label}
        value={values[name]}
        onChange={handleChange(name)}
        width={'300px'}
        type={type}
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
    </View>
  );
}
