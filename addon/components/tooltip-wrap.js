import Ember from 'ember';
import layout from '../templates/components/tooltip-wrap';

export default Ember.Component.extend({
  layout,
  hoverArea: { isHoverArea: true }, // hover mouse over this yeild area to trigger tooltip
  tooltipArea: { isTooltipArea: true }, // yield area for tooltip content
  foundation: Ember.inject.service('foundationService'),
  hoverDelay: 500,
  timer: null,
  didInsertElement() {
    this.set('$tooltip', Ember.$(`#${this.get('tooltipId')}`));
    this.get('foundation').reflow('dropdown');
  },
  tooltipId: Ember.computed('this.elementId', function() {
    return `tooltip-${this.elementId}`;
  }),
  $tooltip: null,
  openTip() {
    this.get('foundation.libs').dropdown.open(this.get('$tooltip'), this.$('.tooltip-trigger'));
  },
  closeTip() {
    this.get('foundation.libs').dropdown.close(this.get('$tooltip'));
  },
  mouseEnter() {
    let that = this;
    this.set('timer', window.setTimeout(() => {
      that.openTip();
    }, this.get('hoverDelay')));
  },
  mouseLeave() {
    window.clearTimeout(this.get('timer'));
    if (this.$('.tooltip:visible').length > 0) {
      this.closeTip();
    }
  }
});
