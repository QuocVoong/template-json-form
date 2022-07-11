export function getFieldByIndex(ifField, currentField) {
  if (!ifField) return "";

  if (ifField.indexOf("$index")) {
    const dependentFieldParts = ifField.split(".");
    const currentFieldParts = currentField.split(".");

    const names = dependentFieldParts.map((part, index) => {
      if (part === "$index") {
        return currentFieldParts[index];
      }

      return part;
    });

    return names.join(".");
  }

  return ifField;
}
