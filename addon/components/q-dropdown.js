import Ember from 'ember';
import layout from '../templates/components/q-dropdown';

export default Ember.Component.extend({
  layout,
  tagName: '',
  btnText: 'dropdown button',
  baseBtnClass: 'dd-button',
  btnClass: '',
  btnTextClasses: '',
  btnClasses: Ember.computed('baseBtnClass', 'btnClass', function() {
    return `${this.get('baseBtnClass')} ${this.get('btnClass')}`;
  }),
  dropdownInstance: null,
  isDisabled: false,
  init() {
    this._super(...arguments);

    let elementId = this.get('id') || this.elementId;
    let appendId = function(str) {
      return `${str}-${elementId}`;
    };
    this.set('dropdownId', appendId('drop'));
    this.set('dropdownButtonId', appendId('a'));
  },

  didInsertElement() {
    this.set('dropdownInstance', Ember.$(`#${this.get('dropdownId')}`));
    this.addListeners();
  },

  positionDropdown() {
    // Don't allow dropdown to go off bottom of screen
    let dropdown = this.get('dropdownInstance');
    let bottomOfDropdown = parseInt(dropdown.offset().top) + dropdown.height();
    if (bottomOfDropdown > $(window).height()) {
      dropdown.css('top', $(window).height() - bottomOfDropdown);
    }
    // Set left pos through attr
    if (Ember.isPresent(this.get('left'))) {
      dropdown.css('left', this.get('left'));
    }
    // Set right pos through attr
    if (Ember.isPresent(this.get('right'))) {
      dropdown.css('right', this.get('right'));
    }
  },

  _onOpen() {
    this.positionDropdown();
    this.onOpen();
  },

  _onClose() {
    this.onClose();
  },

  onOpen() {
    // override me
  },

  onClose() {
    // override me
  },

  addListeners() {
    let dropdown = this.get('dropdownInstance');
    dropdown.on('opened.fndtn.dropdown', Ember.$.proxy(this._onOpen, this));
    dropdown.on('closed.fndtn.dropdown', Ember.$.proxy(this._onClose, this));
  },

  removeListeners() {
    let dropdown = this.get('dropdownInstance');
    dropdown.off('opened.fndtn.dropdown', Ember.$.proxy(this._onOpen, this));
    dropdown.off('closed.fndtn.dropdown', Ember.$.proxy(this._onClose, this));
  },

  willDestroyElement() {
    this.removeListeners();
  },

  html: Ember.computed('btnHtml', function() {
    let htmlStr = this.get('btnHtml');
    if (Ember.isPresent(htmlStr)) {
      return Ember.String.htmlSafe(htmlStr);
    }
    return;
  })

});
