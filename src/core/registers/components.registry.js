import React from "react";
import defaults from "lodash/defaults";
import Button from "../components/Button";
import Text from "../components/Text";
import IconButton from "../components/IconButton";
import Table from "../components/Table";
import ContentDialog from "../components/ContentDialog";

export let CustomComponents = {
  button: Button,
  iconButton: IconButton,
  text: Text,
  table: Table,
  contentDialog: ContentDialog,
};

export function getCustomComponent(name) {
  return CustomComponents[name];
}

export function getRegisteredComponent(name) {
  return React.createElement(CustomComponents[name], {});
}

export function registerComponent(newComponents) {
  defaults(CustomComponents, newComponents);
}