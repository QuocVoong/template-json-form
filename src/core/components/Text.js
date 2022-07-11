import React from "react";
import Typography from "@mui/material/Typography";

export default function Text({ label, value, className, style }) {
  return (
    <Typography
      className={className}
      style={style}
      sx={{ display: 'inline-block' }}
      variant="body1"
    >
      {label + ' ' + (value || '')}
    </Typography>
  );
}