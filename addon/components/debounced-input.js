/**
  Debounced Input Component

  A basic input that sends out `onInputChanged` and `onCancel` actions.
*/
import Ember from 'ember';
import layout from '../templates/components/debounced-input';

const {
  Component,
  get,
  assert,
  isPresent
} = Ember;

const {
  debounce
} = Ember.run;

export default Component.extend({
  layout,

  /**
    String to set as the input's value.
  */
  value: null,

  /**
    Value for the child input component. Set from the value attribute.
    @default ''
  */
  inputValue: null,

  /**
    Placeholder passed to the input component.
    @default 'Search...'.
  */
  placeholder: null,

  /**
    How long to debounce calls to the search action.
    @default 300
  */
  onChangeDebounceTime: 300,

  init() {
    this._super(...arguments);
    let inputChangedAction = get(this.attrs, 'onInputChanged');
    assert('Must provide an onInputChanged action.', isPresent(inputChangedAction));
  },

  didReceiveAttrs() {
    let search = get(this.attrs, 'value.value') || '';
    let placeholder = get(this.attrs, 'placeholder.value') || 'Search...';

    this.set('inputValue', search);
    this.set('placeholder', placeholder);
  },

  actions: {
    enter() {
      if (this.attrs.enter) {
        this.attrs.enter();
      }
    },

    keyPress() {
      let debounceTime = this.get('onChangeDebounceTime');
      debounce(this, this._sendChangeAction, debounceTime);
    },

    escapePress() {
      // this.set('inputValue', '');
      // this.attrs.onInputChanged('');
      if (this.attrs['escape-press']) {
        this.attrs['escape-press']();
      }
    }
  },

  _sendChangeAction() {
    if (this.get('isDestroyed')) {
      return;
    }

    this.attrs.onInputChanged(this.get('inputValue'));
  }
});
