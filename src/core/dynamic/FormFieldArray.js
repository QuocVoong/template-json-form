import React from "react";
import get from 'lodash/get';
import { FieldArray, useFormikContext } from "formik";
import Box from "@mui/material/Box";
import { FormFieldRenderer } from "./FormFieldRenderer";

export function FormFieldArray({ schema, name }) {
  const { values } = useFormikContext();

  const arrValues = get(values, name, []);

  return (
    <Box data-testid={name.replaceAll('.', '-')}>
      <FieldArray
        name={name}
        render={() =>
          arrValues.map((_val, index) => {
            const groupName = `${name}.${index}`;
            return (
              <FormFieldRenderer
                key={name + index}
                schema={schema}
                name={groupName}
              />
            );
          })
        }
      />
    </Box>
  );
}
