import { useMemo } from "react";
import { getEventHandler } from "../registers/events.registry";
import { getFieldByIndex } from "../utils";

export default function useCheckHiddenIf(hiddenIf, formikContext, currentFieldName) {
  return useMemo(
    () => () => {
      if (hiddenIf) {
        if (typeof hiddenIf === "string") {
          const handler = getEventHandler(hiddenIf);
          return handler(formikContext, currentFieldName);
        }

        if (hiddenIf instanceof Array) {
          const conds = hiddenIf.map((h) => {
            if (h instanceof Array) {
              const childConds = h.map((hh) => {
                const hiddenIfFieldName = getFieldByIndex(
                  hh.field,
                  currentFieldName
                );
                return formikContext.getFieldMeta(hiddenIfFieldName).value === hh.value;
              });
              return !childConds.includes(false);
            } else {
              const hiddenIfFieldName = getFieldByIndex(
                h.field,
                currentFieldName
              );
              return formikContext.getFieldMeta(hiddenIfFieldName).value === h.value;
            }
          });
          return conds.includes(true);
        } else if (hiddenIf.field) {
          const hiddenIfFieldName = getFieldByIndex(
            hiddenIf.field,
            currentFieldName
          );
          return formikContext.getFieldMeta(hiddenIfFieldName).value === hiddenIf.value;
        }
      }

      return false;
    },
    // eslint-disable-next-line
    [hiddenIf, formikContext.getFieldMeta, currentFieldName]
  );
}
