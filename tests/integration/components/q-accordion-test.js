import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('q-accordion', 'Integration | Component | q accordion', {
  integration: true
});

test('it sets an active section', function(assert) {
  assert.expect(10);

  this.set('activeSection', 'item2');
  this.set('actions', {
    activateAccordionSection(section) {
      this.set('activeSection', section.get('id'));
    }
  });

  this.render(hbs`
    {{#q-accordion
      activeSection=activeSection
      onActivateSection=(action 'activateAccordionSection') as |group|}}

      {{#accordion-section id='item1' title='Item 1 Title' group=group}}
        Item 1
      {{/accordion-section}}
      {{#accordion-section id='item2' title='Item 2 Title' group=group}}
        Item 2
      {{/accordion-section}}
    {{/q-accordion}}
  `);

  assert.equal(this.$('#item1 .heading').text().trim(), 'Item 1 Title', 'Item 1 title should render');
  assert.equal(this.$('#item2 .heading').text().trim(), 'Item 2 Title', 'Item 2 title should render');
  assert.ok(this.$('#item2').hasClass('active'), 'item 2 should be active');
  assert.equal(this.$('#item2 .fa-chevron-down').length, 1, 'chevron should be down');
  assert.equal(this.$('#item1 .fa-chevron-right').length, 1, 'chevron should be right');
  assert.equal(this.$('.active .content').text().trim(), 'Item 2', 'Item 2 text should show');

  this.$('#item1 .test-section-toggle').click();

  assert.ok(this.$('#item1').hasClass('active'), 'item 1 should be active');
  assert.equal(this.$('#item2 .fa-chevron-right').length, 1, 'chevron should be right');
  assert.equal(this.$('#item1 .fa-chevron-down').length, 1, 'chevron should be down');
  assert.equal(this.$('.active .content').text().trim(), 'Item 1', 'Item 1 text should show');
});

test('it does not select first section if multi', function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{#q-accordion
      allowMulti=true as |group|}}
      {{#accordion-section id='item1' title='Item 1 Title' group=group}}
        Item 1
      {{/accordion-section}}
      {{#accordion-section id='item2' title='Item 2 Title' group=group}}
        Item 2
      {{/accordion-section}}
    {{/q-accordion}}
  `);

  assert.notOk(this.$('#item1').hasClass('active'), 'item 1 should not be active');
  assert.notOk(this.$('#item2').hasClass('active'), 'item 2 should not be active');
  assert.equal(this.$('#item1 .fa-chevron-right').length, 1, 'item 1 chevron should be right');
  assert.equal(this.$('#item2 .fa-chevron-right').length, 1, 'item 2 chevron should be right');
});

test('collapses all sections if activeSection is empty', function(assert) {
  assert.expect(4);

  this.set('actions', {
    activateAccordionSection(section) {
      this.set('activeSection', section.get('id'));
    }
  });

  this.render(hbs`
    {{#q-accordion
      activeSection=activeSection
      onActivateSection=(action 'activateAccordionSection') as |group|}}

      {{#accordion-section id='item1' title='Item 1 Title' group=group}}
        Item 1
      {{/accordion-section}}
      {{#accordion-section id='item2' title='Item 2 Title' group=group}}
        Item 2
      {{/accordion-section}}
    {{/q-accordion}}
  `);

  assert.ok(!this.$('#item1').hasClass('active'), 'item 1 should not be active');
  assert.ok(!this.$('#item2').hasClass('active'), 'item 2 should not be active');
  assert.equal(this.$('#item2 .fa-chevron-down').length, 0, 'chevron should be right');
  assert.equal(this.$('#item1 .fa-chevron-down').length, 0, 'chevron should be right');
});

test('accordion-sections require a non-ember-generated id', function(assert) {
  this.set('actions', {
    activateAccordionSection(section) {
      this.set('activeSection', section.get('id'));
    }
  });

  assert.throws(() => {
    this.render(hbs`
      {{#q-accordion
        activeSection=activeSection
        onActivateSection=(action 'activateAccordionSection') as |group|}}

        {{#accordion-section title='Item 1 Title' group=group}}
          Item 1
        {{/accordion-section}}
      {{/q-accordion}}
    `);
  }, 'Must provide an id.');
});

test('accordion-sections require a group', function(assert) {
  this.set('actions', {
    activateAccordionSection(section) {
      this.set('activeSection', section.get('id'));
    }
  });

  assert.throws(() => {
    this.render(hbs`
      {{#q-accordion
        activeSection=activeSection
        onActivateSection=(action 'activateAccordionSection') as |group|}}

        {{#accordion-section id='item1' title='Item 1 Title'}}
          Item 1
        {{/accordion-section}}
      {{/q-accordion}}
    `);
  }, 'Must provide a group to {{accordion-section}}.');
});

test('accordion-sections require an onActivateSection closure action if single', function(assert) {
  this.set('actions', {
    activateAccordionSection(section) {
      this.set('activeSection', section.get('id'));
    }
  });

  assert.throws(() => {
    this.render(hbs`
      {{#q-accordion
        activeSection=activeSection as |group|}}

        {{#accordion-section id='item1' title='Item 1 Title' group=group}}
          Item 1
        {{/accordion-section}}
      {{/q-accordion}}
    `);
  }, 'Must provide an onActivateSection closure action to {{q-accordion}}.');
});

test('accordion-sections don\'t require an onActivateSection closure action if multi', function(assert) {
  assert.ok(() => {
    this.render(hbs`
      {{#q-accordion
        activeSection=activeSection as |group|}}

        {{#accordion-section id='item1' title='Item 1 Title' group=group}}
          Item 1
        {{/accordion-section}}
      {{/q-accordion}}
    `);
  }, 'Do not need to provide an onActivateSection closure action to {{q-accordion}}.');
});

test('select multiple sections if multi', function(assert) {
  assert.expect(6);

  this.render(hbs`
    {{#q-accordion
      allowMulti=true as |group|}}

      {{#accordion-section id='item1' title='Item 1 Title' group=group}}
        Item 1
      {{/accordion-section}}
      {{#accordion-section id='item2' title='Item 2 Title' group=group}}
        Item 2
      {{/accordion-section}}
    {{/q-accordion}}
  `);

  assert.equal(this.$('#item1 .heading').text().trim(), 'Item 1 Title', 'Item 1 title should render');
  assert.equal(this.$('#item2 .heading').text().trim(), 'Item 2 Title', 'Item 2 title should render');

  assert.notOk(this.$('#item1').hasClass('active'), 'item 1 should not be active');
  assert.notOk(this.$('#item2').hasClass('active'), 'item 2 should not be active');

  this.$('#item1 .test-section-toggle').click();
  this.$('#item2 .test-section-toggle').click();

  assert.ok(this.$('#item1').hasClass('active'), 'item 1 should be active');
  assert.ok(this.$('#item2').hasClass('active'), 'item 2 should be active');
});
