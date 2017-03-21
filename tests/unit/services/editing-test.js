import { moduleFor, test } from 'ember-qunit';

moduleFor('service:editing', 'Unit | Service | editing', {
});

test('it returns isEditing set by setIsEditing', function(assert) {
  let service = this.subject();
  service.setIsEditing(true);

  let result = service.get('isEditing');
  assert.equal(result, true);
});

test('it returns isEditing set by toggleIsEditing', function(assert) {
  let service = this.subject();
  let editBoolean = service.get('isEditing');

  service.toggleIsEditing();

  let result = service.get('isEditing');
  assert.equal(result, !editBoolean);

  service.toggleIsEditing();

  result = service.get('isEditing');
  assert.equal(result, editBoolean);
});
