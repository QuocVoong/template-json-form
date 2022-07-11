import React, { useEffect, useState } from "react";
import { FastField, useField, useFormikContext } from "formik";
import { getCustomComponent } from "../registers/components.registry";
import useCheckHiddenIf from "../hooks/useCheckHiddenIf";
import useCheckDisabledIf from "../hooks/useCheckDisabledIf";

export default function FormDisplayField(props) {
  const { name, component, hiddenIf, disabledIf, ...forwardProps } = props;
  const [, meta] = useField(name);
  const { value } = meta;
  const renderedComponent = getCustomComponent(component);
  let fieldProps = { ...forwardProps, value, name };

  const formikContext = useFormikContext();

  const checkHiddenIf = useCheckHiddenIf(hiddenIf, formikContext, name);

  const checkDisabledIf = useCheckDisabledIf(disabledIf, formikContext, name);

  const [hidden, setHidden] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const hiddenIfStatus = checkHiddenIf();
  const disabledIfStatus = checkDisabledIf();

  useEffect(() => {
    setHidden(hiddenIfStatus);
    setDisabled(disabledIfStatus);
    // eslint-disable-next-line
  }, [hiddenIfStatus, disabledIfStatus]);

  fieldProps.disabled = disabled;
  if (!fieldProps.disabled) {
    delete fieldProps['disabled'];
  }

  return (
    <>
      {!hidden && (
        <FastField as={renderedComponent} {...fieldProps} />
      )}
    </>
  );
}