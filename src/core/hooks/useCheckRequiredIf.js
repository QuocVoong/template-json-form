import { useCallback } from "react";

export default function useCheckRequiredIf(requiredIf, getFieldMeta, required) {
  return useCallback(() => {
    if (requiredIf && requiredIf.field) {
      return getFieldMeta(requiredIf.field).value === requiredIf.value;
    }

    return !!required;
  }, [requiredIf, getFieldMeta, required]);
}