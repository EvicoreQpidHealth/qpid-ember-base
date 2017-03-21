import Ember from 'ember';
import KEYCODES from '../../utils/keycodes';

export function triggerDownArrowKey(input, options) {
  triggerKey(input, KEYCODES.DOWN_ARROW, options);
}

export function triggerUpArrowKey(input, options) {
  triggerKey(input, KEYCODES.UP_ARROW, options);
}

export function triggerEnterKey(input, options) {
  triggerKey(input, KEYCODES.ENTER, options);
}

export function triggerEscapeKey(input, options) {
  triggerKey(input, KEYCODES.ESCAPE, options);
}

export function triggerKey(input, keyCode, options={}) {
  let { type } = options;
  input.focus().trigger(newKeyEvent(keyCode, type));
}

function newKeyEvent(code, type='keyup') {
  return Ember.$.Event(type, { keyCode: code });
}
