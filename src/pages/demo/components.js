import React from "react";
import DialogContent from "@mui/material/DialogContent";

const renderName = (row) => {
  return `${row.firstName} ${row.lastName}`
}

const CreatingDialog = (props) => {
  return (
    <div>
      <DialogContent dividers style={{ maxHeight: 500 }}>

      </DialogContent>
    </div>
  )
}

export const components = {
  renderName,
  CreatingDialog,
}