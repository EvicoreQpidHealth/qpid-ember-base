import Ember from 'ember';
import layout from '../templates/components/map-editor';

export default Ember.Component.extend({
  layout,
  isLocked: false,
  mapList: Ember.computed('map', function() {
    let results = Ember.A([]);
    let obj = JSON.parse(JSON.stringify(this.get('map')));
    Ember.$.each(obj, (property) => {
      let value = obj[property];
      results.pushObject(Ember.Object.create({
        property,
        value
      }));
    });
    return results;
  }),

  update() {
    this.get('mapList').forEach((item) => {
      let property = item.get('property');
      let value = item.get('value');
      this.attrs.change(property, value);
    });
  },

  actions: {
    addProperty() {
      this.get('mapList').pushObject(Ember.Object.create({
        property: this.get('newProperty'),
        value: ''
      }));
      this.set('newProperty', '');
      this.update();
    },
    debounceUpdate() {
      Ember.run.debounce(this, this.update, 1000);
    },
    deleteProperty(item) {
      this.get('mapList').removeObject(item);
      this.attrs.delete(item.get('property'));
    }
  }
});
