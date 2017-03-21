import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('summary-results');
  this.route('fancy-search');
  this.route('tabs', function() {
    this.route('one');
    this.route('two');
  });
  this.route('accordion');
  this.route('autocomplete');
});

export default Router;
