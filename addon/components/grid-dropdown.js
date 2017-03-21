import Ember from 'ember';
import BASE from './q-base';
import layout from '../templates/components/grid-dropdown';

export default BASE.extend({
  layout,

  foundation: Ember.inject.service('foundationService'),

  disableAddColumns: Ember.computed('gridLayout.[]', 'displayLayout.row', function() {
    let rowNum = this.get('displayLayout.row');
    return this.get('gridLayout').filterBy('row', rowNum).length >= 6;
  }),

  disableAddRows: Ember.computed('gridLayout.[]', 'displayLayout.row', function() {
    return this.get('gridLayout').mapBy('row').uniq().length >= 3;
  }),

  didRender() {
    this.$().foundation('tooltip', 'reflow');
  },

  ddMenu: Ember.computed('gridLayout.[]', 'cardMenu.@each.action', function() {
    let cardMenu = this.get('cardMenu');
    let menu = [
        {
          action: 'addAbove',
          label: 'Add Above',
          cssClass: 'section-divider addAbove',
          disabled: false,
          disabledPropertyName: 'disableAddRows',
          tooltipText: 'There cannot be more than 3 rows'
        },
        {
          action: 'addBelow',
          label: 'Add Below',
          cssClass: 'addBelow',
          disabled: false,
          disabledPropertyName: 'disableAddRows',
          tooltipText: 'There cannot be more than 3 rows'
        },
        {
          action: 'addLeft',
          label: 'Add Left',
          cssClass: 'addLeft',
          disabled: false,
          disabledPropertyName: 'disableAddColumns',
          tooltipText: 'There cannot be more than 6 columns'
        },
        {
          action: 'addRight',
          label: 'Add Right',
          cssClass: 'addRight',
          disabled: false,
          disabledPropertyName: 'disableAddColumns',
          tooltipText: 'There cannot be more than 6 columns'
        },
        {
          action: 'deleteRow',
          label: 'Delete This Row',
          cssClass: 'section-divider deleteRow',
          disabled: false,
          tooltipText: false
        },
        {
          action: 'deleteColumn',
          label: 'Delete This Column',
          cssClass: 'deleteColumn',
          disabled: false,
          tooltipText: false
        },
        {
          action: 'deleteSection',
          label: 'Delete This Section',
          cssClass: 'section-divider deleteSection',
          disabled: false,
          tooltipText: false
        }
      ];
    menu.forEach((item) => {
      if (Ember.isPresent(item.disabledPropertyName)) {
        item.disabled = this.get(`${item.disabledPropertyName}`);
      }
    });
    let newMenu = [];
    newMenu.pushObjects(cardMenu).pushObjects(menu);

    return newMenu;
  }),

  actions: {
    // dropdown actions
    componentMouseEnter(element) {
      this.callClosureAction('handleHighlighting', element, true);
    },
    componentMouseLeave(element) {
      this.callClosureAction('handleHighlighting', element, false);
    },
    addAbove() {
      if (!this.get('disableAddRows')) {
        this.callClosureAction('addAbove', this.get('displayLayout'));
      }
    },
    addBelow() {
      if (!this.get('disableAddRows')) {
        this.callClosureAction('addBelow', this.get('displayLayout'));
      }
    },
    addLeft() {
      if (!this.get('disableAddColumns')) {
        this.callClosureAction('addLeft', this.get('displayLayout'));
      }
    },
    addRight() {
      if (!this.get('disableAddColumns')) {
        this.callClosureAction('addRight', this.get('displayLayout'));
      }
    },
    deleteRow() {
      this.callClosureAction('deleteRow', this.get('displayLayout'));
    },
    deleteColumn() {
      this.callClosureAction('deleteColumn', this.get('displayLayout'));
    },
    deleteSection() {
      this.callClosureAction('deleteSection', this.get('displayLayout'));
    },
    newDisplay() {
      this.callClosureAction('newDisplay');
    },
    editCardOrder() {
      this.callClosureAction('editCardOrder');
    },
    saveCardOrder() {
      this.callClosureAction('saveCardOrder');
    },
    editSectionName() {
      this.callClosureAction('editSectionName');
    }
  }
});
