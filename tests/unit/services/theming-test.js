import { moduleFor, test } from 'ember-qunit';

moduleFor('service:theming', 'Unit | Service | theming', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('base is set correctly', function(assert) {
  assert.expect(1);

  let service = this.subject();

  assert.equal(service.get('base'), 'theme-');
});

test('theme is defaulted to qpid', function(assert) {
  assert.expect(1);

  let service = this.subject();

  assert.equal(service.get('theme'), 'qpid');
});

test('setTheme replaces the previous theme class with the new theme class',
  function(assert) {
    assert.expect(2);

    let service = this.subject();

    service._getBody = function() {
      return {
        removeClass(cssClass) {
          assert.equal(cssClass, 'theme-qpid');
          return this;
        },
        addClass(cssClass) {
          assert.equal(cssClass, 'theme-uhc');
          return this;
        }
      };
    };

    service.setTheme('uhc');
  });
