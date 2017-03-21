import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dropdown-layout-switcher', 'Integration | Component | dropdown layout switcher', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{dropdown-layout-switcher}}`);

  assert.equal(this.$().text().trim(), '');
});

test('lists available layouts', function(assert) {
  let layouts = [
    {
      name: 'Test 1'
    },
    {
      name: 'Test 2'
    }
  ];
  this.set('layouts', layouts);

  this.render(hbs`{{dropdown-layout-switcher layouts=layouts arrow=true}}`);

  assert.equal(this.$('li a').length, 2, 'should be two layouts');

  assert.equal(this.$('li a').eq(0).text(), 'Test 1', 'first layout should be first in the list');
});

test('clicking a layout loads that layout', function(assert) {
  let layouts = [
    {
      name: 'Test 1'
    },
    {
      name: 'Test 2'
    }
  ];

  let [currentLayout] = layouts;
  let dummySwitch = function(layout) {
    this.set('currentLayout', layout);
  };
  this.set('currentLayout', currentLayout);
  this.set('layouts', layouts);
  this.set('switchLayout', dummySwitch);

  this.render(hbs`{{dropdown-layout-switcher
    layouts=layouts
    currentLayout=currentLayout
    switchLayout=(action switchLayout)
    arrow=true }}`
  );

  this.$('li:last a').click();
  assert.equal(this.get('currentLayout.name'), 'Test 2', 'should equal the second layout name');
});
