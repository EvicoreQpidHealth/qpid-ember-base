import Ember from 'ember';
import layout from '../../templates/components/nav/app-title';

const { service } = Ember.inject;

export default Ember.Component.extend({
  layout,
  tagName: '',
  appTitle: service()
});
