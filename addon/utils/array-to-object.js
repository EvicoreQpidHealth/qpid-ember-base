import { get } from '@ember/object';

export default function arrayToObject(array, keyProperty='name', valueProperty='value') {
  let object = {};

  array.forEach((item) => {
    let key = get(item, keyProperty);
    let value = get(item, valueProperty);
    object[key] = value;
  });

  return object;
}
