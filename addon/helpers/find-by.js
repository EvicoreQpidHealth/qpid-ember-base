import Ember from 'ember';

/*
 * Given a known key & value pair, find the associated object in an enumerable,
 * and return the value of a different key.
 *
 * srcKey   : Key of the known value
 * srcVal   : The known value
 * obj      : The ennumerable to search
 * printKey : Key for the desired output value
 */
export function findBy([srcKey, srcVal, obj, printKey]) {
  let foundObj = obj.findBy(srcKey, srcVal);
  return Ember.isEmpty(foundObj) ? '' : foundObj[printKey] || '';
}

export default Ember.Helper.helper(findBy);
