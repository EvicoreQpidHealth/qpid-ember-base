import Ember from 'ember';
import layout from '../templates/components/q-table-cell';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'td',

  cellData: computed('data', 'transform', function() {
    let data = this.get('data');
    let transform = this.get('transform');
    if (transform) {
      return transform(data, this);
    }
  }),

  actions: {
    buttonAction() {
      if (this.get('action')) {
        this.get('action')(this.get('data'));
      }
    },
    updateAction(value) {
      if (this.get('action')) {
        this.get('action')(value, this.get('data'));
      }
    },
    change(value) {
      this.get('data').set(this.get('field'), value);
      this.sendAction('change');
    }
  }
});
