import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import appTitleComponent from '../../../components/app-title';

moduleForComponent('app-title', 'Integration | Component | app title', {
  integration: true
});

test('it renders', function(assert) {
  // stub out the appTitle service
  appTitleComponent.reopen({
    appTitle: {
      current: 'A Current Title'
    }
  });

  this.render(hbs`{{app-title}}`);

  assert.equal(this.$('.title').text().trim(), 'A Current Title');
});
