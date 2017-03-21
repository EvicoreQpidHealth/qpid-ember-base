import Ember from 'ember';
import refreshLogic from '../utils/resize';

/**
  This component is a stop-gap that doesn't rely on setupController.
  Used until we can do the following:
    - replace resizing util with flexbox implementation
    - replace foundation components with ember compatible ones
      (ex: https://github.com/joshforisha/ember-foundation)
 @public
*/
export default Ember.Component.extend({
  tagName: '',

  /**
    Runs resizing logic and sets up foundation.
   @public
  */
  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      refreshLogic();
      $(document).foundation();
    });
  }
});
