import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useFormikContext } from "formik";
import { FormFieldRenderer } from "./FormFieldRenderer";
import useCheckHiddenIf from "../hooks/useCheckHiddenIf";

export function FormFieldGroup({ schema, name, hiddenIf }) {
  const formikContext = useFormikContext();

  const checkHiddenIf = useCheckHiddenIf(hiddenIf, formikContext, name);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hiddenIfStatus = checkHiddenIf();

    setHidden(hiddenIfStatus);
  }, [checkHiddenIf]);

  return (
    <Box data-testid={name.replaceAll(".", "-")}>
      {!hidden && (
        <FormFieldRenderer name={name} schema={schema} />
      )}
    </Box>
  );
}

