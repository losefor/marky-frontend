import React from "react";
import Button from "../Button";
import { useFormikContext } from "formik";

export default function FormButton({ label, rounded, color }) {
  const { handleSubmit } = useFormikContext();
  return (
    <div>
      <Button
        onClick={handleSubmit}
        type={"submit"}
        label={label}
        rounded={rounded}
        color={color}
      />
    </div>
  );
}
