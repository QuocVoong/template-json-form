import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useFormikContext } from "formik";
import { getCustomComponent } from "../registers/components.registry";

export default function ContentDialog(props) {
  const { openDialogIf, body, maxWidth ='xs', ...rest } = props;
  const formikContext = useFormikContext();
  const { getFieldMeta } = formikContext;
  const BodyComponent = getCustomComponent(body);

  const [openDialog, setOpenDialog] = useState(false);

  let openDialogIfValue = false;
  if (openDialogIf) {
    openDialogIfValue = getFieldMeta(openDialogIf).value;
  }

  useEffect(() => {
    setOpenDialog(openDialogIfValue);
  }, [openDialogIfValue]);

  return (
    <Dialog
      maxWidth={maxWidth}
      {...rest}
      open={openDialog}
    >
      <BodyComponent />
    </Dialog>
  );
}
