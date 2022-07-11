import get from 'lodash/get';

let eventHandlers = {};

export function getEventHandler(name, context, ...args) {
  const fn = get(eventHandlers, name, null);
  if (fn) {
    return fn(context, ...args);
  }
  return null;
}

export function registerEventHandlers(newEventHandlers) {
  eventHandlers = { ...eventHandlers, ...newEventHandlers };
}