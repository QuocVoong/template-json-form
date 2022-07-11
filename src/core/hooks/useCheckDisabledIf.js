import { useCallback } from "react";
import { getEventHandler } from "../registers/events.registry";
import { getFieldByIndex } from "../utils";

export default function useCheckDisabledIf(disabledIf, formikContext, currentFieldName) {
  return useCallback(() => {
    if (typeof disabledIf === "string") {
      const handler = getEventHandler(disabledIf);
      return handler(formikContext, currentFieldName);
    }

    if (disabledIf && disabledIf.field) {
      const disableIfFieldName = getFieldByIndex(disabledIf.field, currentFieldName);
      return formikContext.getFieldMeta(disableIfFieldName).value === disabledIf.value;
    }

    return false;
    // eslint-disable-next-line
  }, [disabledIf, formikContext.getFieldMeta, currentFieldName]);
}