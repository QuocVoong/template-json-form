import React from 'react';
import schema from './schema.json';
import { FormFieldRenderer } from "../../core/dynamic/FormFieldRenderer";
import { Form, Formik } from "formik";
import { registerEventHandlers } from "../../core/registers/events.registry";
import { events } from "./events";
import { registerComponent } from "../../core/registers/components.registry";
import { components } from "./components";

function Demo() {
  const { formSchema, initialValue } = schema;
  registerEventHandlers(events);
  registerComponent(components);

  return (
    <div>
      <Formik
        initialValues={initialValue}
        validateOnChange={false}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log({ values });
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {() => {
          return (
            <Form>
              {formSchema && (
                <FormFieldRenderer schema={formSchema} name={"demo"} />
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  )
}

export default React.memo(Demo);
