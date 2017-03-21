import { validId } from '../../../helpers/valid-id';
import { module, test } from 'qunit';

module('Unit | Helper | valid id');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = validId(['5-hidee-%$@#*)@Ho.ooooo!']);
  assert.equal(result, 'hidee-Hoooooo', 'it removes invalid characters');

  let result2 = validId(['H5-idee-%$/?@Hoo.oooo!']);
  assert.equal(result2, 'H5-idee-Hoooooo', 'it removes invalid characters');

  let result3 = validId(['_H5i_dee-%.$:%?()@Hoooooo!']);
  assert.equal(result3, 'H5i_dee-Hoooooo', 'it removes invalid characters');
});
