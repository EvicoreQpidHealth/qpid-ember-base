import Ember from 'ember';
import layout from '../../templates/components/layout/card-column-main';
import Resizing from '../../mixins/resizing';

export default Ember.Component.extend(Resizing, {
  layout,
  classNames: ['main', 'flex'],
  classNameBindings: ['noOverflow:no-overflow']
});
