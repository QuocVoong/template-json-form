import React, { useCallback } from 'react';
import { useNavigate } from "react-router";
import MIconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { getEventHandler } from "../registers/events.registry";
import { useFormikContext } from "formik";

export default function IconButton(props) {
  const { icon, size = "medium", onClickFn, className, name, ...rest } = props;
  const formikContext = useFormikContext();
  const navigate = useNavigate();

  let onClick = null;
  if (onClickFn) {
    onClick = getEventHandler(onClickFn, formikContext, navigate);
  }

  const handleOnClick = useCallback(() => {
    onClick && onClick(name);
  }, [onClick, name]);

  return (
    <MIconButton
      name={name}
      color="primary"
      className={className}
      onClick={handleOnClick}
      {...rest}
    >
      <Icon fontSize={size}>{icon}</Icon>
    </MIconButton>
  );
}