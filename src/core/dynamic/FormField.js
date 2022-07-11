import React from "react";
import FormDisplayField from "./FormDispalyField";
import FormInputField from "./FormInputField";

export function FormField(props) {
  const { component, onlyDisplay, name, label, className, options, ...rest } = props;

  if (onlyDisplay) {
    const forwardProps = { ...rest, name, component, label };

    return (
      <FormDisplayField {...forwardProps} />
    );
  } else {
    const inputProps = { ...rest, name, component, label, options };
    return (
      <FormInputField className={className} {...inputProps} />
    );
  }
}