import React, { Children, cloneElement, isValidElement, useMemo } from "react";
import Box from "@mui/material/Box";

export default function DynamicRow(props) {
  const { children, flex, flexGrow, className, ...rest } = props;
  const childrenWithProps = useMemo(() => {
    return Children.map(children, (child, index) => {
      if (isValidElement(child)) {
        return cloneElement(child);
      }

      return <React.Fragment key={"child_" + index}>child</React.Fragment>;
    });
  }, [children]);

  return (
    <Box
      mb={1}
      className={className}
      {...rest}
    >
      {childrenWithProps}
    </Box>
  );
}