import Ember from 'ember';
import layout from '../templates/components/notification-count';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'a',
  classNames: ['notification-amount'],
  classNameBindings: ['hasNotifications::hide'],

  maxDisplayCount: 999,
  icon: 'bell',

  _count: 0, // Number of notifications

  count: computed('_count', {
    get() {
      return this.get('_count');
    },
    set(key, val) {
      let prevCount = this.get('_count');
      this.set('_count', val);

      // Notify parent when width of this component changes so that
      // we can use as much space as possible for the username in the header.
      if (String(prevCount).length !== String(val).length || val === 0 || (prevCount === 0 && val > 0)) {
        Ember.run.scheduleOnce('afterRender', ()=> {
          this.sendAction('notificationDisplayChange');
        });
      }

      return val;
    }
  }),

  hasNotifications: computed.gt('count', 0),
  displayCount: computed('count', 'maxDisplayCount', function() {
    let count = this.get('count');
    let maxCount = this.get('maxDisplayCount');
    return count > maxCount ? `${maxCount}+` : count;
  }),

  click() {
    this.sendAction();
  }
});
