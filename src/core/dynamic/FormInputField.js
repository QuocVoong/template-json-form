import React, { useEffect, useState } from "react";
import { FastField, useField, useFormikContext } from "formik";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { getCustomComponent } from "../registers/components.registry";
import useCheckHiddenIf from "../hooks/useCheckHiddenIf";
import useCheckDisabledIf from "../hooks/useCheckDisabledIf";
import useCheckRequiredIf from "../hooks/useCheckRequiredIf";

export default function FormInputField(props) {
  const {
    disabled,
    label,
    component,
    name,
    disabledIf,
    requiredIf,
    required, // will be ignore if any requiredIf
    hiddenIf,
    readOnlyIf,
    emptyValue,
    labelSuffix,
    ...rest
  } = props;
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const formikContext = useFormikContext();
  const { getFieldMeta } = formikContext;

  const onChange = (newVal) => {
    setTouched(true);
    setValue(newVal, true);
  };

  const checkHiddenIf = useCheckHiddenIf(hiddenIf, formikContext, name);

  const checkDisabledIf = useCheckDisabledIf(disabledIf, formikContext, name);

  const checkRequiredIf = useCheckRequiredIf(requiredIf, getFieldMeta, required);

  const [componentState, setComponentState] = useState({
    readOnly: false,
    disabled: false,
    required: false,
    hidden: false,
  });

  useEffect(() => {
    const disabledIfStatus = checkDisabledIf();
    const hiddenIfStatus = checkHiddenIf();

    if (disabledIfStatus || hiddenIfStatus) {
      setValue(emptyValue || '');
    }

    setComponentState({
      disabled: disabledIfStatus,
      hidden: hiddenIfStatus,
      required: checkRequiredIf(),
    });

    // eslint-disable-next-line
  }, [checkDisabledIf, checkRequiredIf, checkHiddenIf, readOnlyIf, meta.error]);

  const forwardProps = {
    ...rest,
    value,
    onChange,
    disabled: disabled || componentState.disabled,
    readOnly: componentState.readOnly,
  };


  if (!forwardProps.disabled) {
    delete forwardProps['disabled'];
  }

  const renderedComponent = getCustomComponent(component);
  return (
    <div data-testid={name}>
      {componentState.hidden && <></>}
      {!componentState.hidden && (
        <FormControl
          error={!!meta.touched && !!meta.error}
          disabled={!!componentState.disabled}
          required={componentState.required}
          style={{ minWidth: 250 }}
        >
          <FormLabel>{label}</FormLabel>
          <FastField name={name} component={renderedComponent} {...forwardProps} />
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </div>
  );
}