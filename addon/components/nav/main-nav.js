import Ember from 'ember';
import layout from '../../templates/components/nav/main-nav';

const {
  Component,
  assert,
  isPresent,
  computed
} = Ember;

const {
  service
} = Ember.inject;

export default Component.extend({
  layout,
  session: service(),
  editing: service(),
  appTitle: service(),
  shouldShowTitle: false,
  shouldShowSearch: false,
  preferences: true,
  leftComponent: { isCustomLeft: true },
  middleComponent: { isCustomMiddle: true },
  didInsertElement() {
    Ember.run.next(() => {
      this.setMargin();
    });
  },
  displayname: Ember.computed('session.data', 'session.isAuthenticated', function() {
    return this.get('session.data.authenticated.displayname');
  }),
  leftClasses: computed('shouldShowSearch', function() {
    if (this.get('shouldShowSearch')) {
      return 'small-6 medium-3 large-3';
    } else {
      return 'small-6 medium-9 large-9';
    }
  }),
  // Dynamically Adjust margin of username so that we can use as much space as possible
  setMargin() {
    let notificationWidth = this.$('.notification-amount').width();
    this.$('h1.username').css(`margin-left`, `${notificationWidth}px`);
  },
  actions: {
    showAppInfo() {
      let appInfoAction = this.getAttr('on-show-app-info');
      assert('your {{main-nav}} component must define an `on-show-app-info` action.', isPresent(appInfoAction));
      appInfoAction();
    },
    notificationDisplayChange() {
      this.setMargin();
    },
    openNotificationDialog() {
      // console.log('show me a dialog!');
    }
  }
});
