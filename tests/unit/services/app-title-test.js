import { moduleFor, test } from 'ember-qunit';

moduleFor('service:app-title', 'Unit | Service | app title', {
});

test('current property returns title set by setTitle', function(assert) {
  let service = this.subject();
  service.setTitle('Cool Title');

  let title = service.get('current');
  assert.equal(title, 'Cool Title');
});
