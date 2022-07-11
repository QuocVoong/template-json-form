import React from 'react';
import compact from 'lodash/compact';
import { FormFieldArray } from "./FormFieldArray";
import Box from "@mui/material/Box";
import { FormFieldGroup } from "./FormFieldGroup";
import { FormField } from "./FormField";
import DynamicRow from "./DynamicRow";

export function buildHierarchyName(parentName, key) {
  const name = key.startsWith('wrapper') ? '' : key;
  if (parentName) {
    return parentName + (name ? '.' + name : name);
  }

  return name;
}

export function buildComponentId(parentName, key) {
  return compact([parentName, key]).join('-').replaceAll('.', '-');
}

export function FormFieldRenderer(props) {
  const { schema, name, sx, className } = props;

  return (
    <Box sx={sx} className={className} data-testid={name}>
      {Object.keys(schema)
        .filter((key) => {
          const fieldSchema = schema[key];
          return (
            typeof fieldSchema !== "string" && typeof fieldSchema !== "number" && !['style', 'sx'].includes(key)
          );
        })
        .map((key, index) => {
          let renderedComponent = null;
          const fieldSchema = schema[key];
          const hierarchyName = buildHierarchyName(name, key);

          if (Array.isArray(fieldSchema)) {
            renderedComponent = (
              <FormFieldArray
                key={hierarchyName + index}
                schema={fieldSchema[0]}
                name={hierarchyName}
              />
            );
          } else {
            const { component, group, flex, flexGrow, sx, style, ...rest } = fieldSchema;
            if (group) {
              const { hiddenIf } = group;
              renderedComponent = (
                <FormFieldGroup
                  key={hierarchyName + index}
                  name={hierarchyName}
                  sx={sx}
                  schema={group}
                  className={className}
                  hiddenIf={hiddenIf}
                />
              );
            } else if (component) {
              renderedComponent = (
                <FormField
                  key={hierarchyName + index}
                  name={hierarchyName}
                  component={component}
                  className={className}
                  style={style}
                  sx={sx}
                  {...rest}
                />
              );
            } else {
              return (
                <DynamicRow
                  data-testid={buildComponentId(name, key)}
                  key={hierarchyName + index}
                  flex={flex}
                  flexGrow={flexGrow}
                  className={className}
                  style={style}
                  {...rest}
                >
                  <FormFieldRenderer
                    name={hierarchyName}
                    schema={schema[key]}
                    sx={sx}
                  />
                </DynamicRow>
              );
            }
          }

          return renderedComponent;
        })}
    </Box>
  );
}
