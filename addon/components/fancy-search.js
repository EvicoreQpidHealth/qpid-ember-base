/**
  Fancy Search Component

  A text input that searches on enter, optionally toggles a search icon, and
  optionally resizes its width to a multiple of the text length.
*/

import Ember from 'ember';
import layout from '../templates/components/fancy-search';

const {
  computed,
  Component
} = Ember;

export const resizeInputWidthModifier = 18;

export default Component.extend({
  layout,
  classNames: ['fancy-search', 'search-input-wrapper'],
  classNameBindings: ['dark', 'extraSpace'],

  /**
    If this input is focused.
    @default false
    @private
  */
  focused: false,

  focusIn() {
    this.set('focused', true);
  },

  /**
    The text used as value for the input
    @default ''
  */
  searchInputText: '',

  hasInputText: computed.gt('searchInputText.length', 0),
  showClearSearchButton: computed.and('focused', 'hasInputText'),

  /**
    If the search icon should be toggled when the input has focus.
    @default false
  */
  toggleSearchIcon: false,

  /**
    If the search icon should be shown.
    @default true
  */
  showSearchIcon: computed('toggleSearchIcon', 'focused', function() {
    let toggle = this.get('toggleSearchIcon');
    let focused = this.get('focused');

    return !toggle || (toggle && focused);
  }),

  /**
    If this input should resize to the content
    @default false
  */
  resizeToContent: false,

  /**
    Sets the width of the input based on the input text length, or 100%.
    @default 'width: 100%'
  */
  inputWidth: computed('resizeToContent', 'focused', 'searchInputText', 'placeHolderText', function() {
    let resize = this.get('resizeToContent');
    let focused = this.get('focused');
    let width = '100%';

    if (resize && !focused) {
      let inputLength = this.get('searchInputText.length') || this.get('placeHolderText.length');
      let expandedWidth = inputLength * resizeInputWidthModifier;

      // Prevent fancy search from overflowing it's wrapping element
      if (this.$() && expandedWidth <= this.$().width()) {
        width = `${expandedWidth}px`;
      }
    }
    return Ember.String.htmlSafe(`width: ${width}`);
  }),

  /**
    If the input should be cleared when the `cancelSearch` action is called
    @default false
  */
  clearSearchOnCancel: false,

  actions: {
    cancelSearch() {
      if (this.getAttr('clearSearchOnCancel')) {
        this.send('clearSearch');
      }
      this.set('focused', false);
    },

    clearSearch() {
      this.set('searchInputText', '');
    },

    doSearch() {
      let text = this.get('searchInputText');
      this.attrs.doSearch(text);
    }
  }
});
