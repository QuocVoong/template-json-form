import React from "react";
import MButton from "@mui/material/Button";
import { useFormikContext } from "formik";
import { useNavigate} from "react-router-dom";
import { getEventHandler } from "../registers/events.registry";

export default function Button(props) {
  const { label, onClickFn, className, name, ...rest } = props;
  const formikContext = useFormikContext();
  const navigate = useNavigate();

  let onClick = null;
  if (onClickFn) {
    onClick = getEventHandler(onClickFn, formikContext, navigate);
  }

  return (
    <MButton
      name={name}
      variant="contained"
      color="primary"
      className={className}
      onClick={onClick}
      {...rest}
    >
      {label}
    </MButton>
  );
}
