import Ember from 'ember';

export default function arrayToObject(array, keyProperty='name', valueProperty='value') {
  let object = {};

  array.forEach((item) => {
    let key = Ember.get(item, keyProperty);
    let value = Ember.get(item, valueProperty);
    object[key] = value;
  });

  return object;
}
