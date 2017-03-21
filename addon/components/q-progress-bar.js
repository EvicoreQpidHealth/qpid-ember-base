import Ember from 'ember';
import layout from '../templates/components/q-progress-bar';

export default Ember.Component.extend({
  layout,
  classNames: ['progress', 'round'],
  completed: null, /* number completed */
  skipped: null, /* number skipped */
  all: null, /* number of all items */
  goal: Ember.computed('all', function() { /* number of items to complete */
    return this.get('all');
  }),
  showGoal: Ember.computed('goal', 'all', function() {
    return !Ember.isEqual(parseInt(this.get('all')), parseInt(this.get('goal')));
  }),
  isComplete: Ember.computed('completed', 'goal', function() {
    return parseInt(this.get('completed')) >= parseInt(this.get('goal'));
  }),
  isMoreThanComplete: Ember.computed('completed', 'goal', function() {
    let num =  parseInt(this.get('completed')) -  parseInt(this.get('goal'));
    if (parseInt(this.get('completed')) > parseInt(this.get('goal'))) {
      return `border-radius: ${num}px;`;
    }
    return '';
  }),
  completedStyle: Ember.computed('isMoreThanComplete', 'completedPercent', function() {
    let str = this.get('completedPercent') + this.get('isMoreThanComplete');
    return Ember.String.htmlSafe(str);
  }),
  completedPercent: Ember.computed('all', 'completed', function() {
    return this.safeCssPercent('width', this.get('completed'));
  }),
  skippedDisplayPercent: Ember.computed('completed', 'skipped', function() {
    if (this.get('skipped')) {
      let value = parseInt(this.get('completed')) + parseInt(this.get('skipped'));
      return this.safeCssPercent('width', value);
    }
  }),
  skippedPercent: Ember.computed('all', 'skipped', function() {
    return this.safeCssPercent('margin-left', this.get('skipped'));
  }),
  goalPercentCss: Ember.computed('all', 'goal', function() {
    return this.safeCssPercent('left', this.get('goal'));
  }),
  safeCssPercent(style, value) {
    let str = `${style}: ${this.percent(value)}%;`;
    return Ember.String.htmlSafe(str);
  },
  percent(num) {
    return num * 100 / this.get('all');
  }
});
