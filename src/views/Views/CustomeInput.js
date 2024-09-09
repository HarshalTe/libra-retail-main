import React from "react";
import { Input } from "reactstrap";
import { TextField } from "formik-material-ui";

const CustomeInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => <TextField {...field} {...props} />;

{
  /* <Input {...field} {...props} />; */
}

export default CustomeInput;
