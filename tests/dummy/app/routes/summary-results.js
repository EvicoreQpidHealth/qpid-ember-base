import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let result = {
      data: {
        name: 'diabetes',
        count: 7,
        snippets: [
          'Patient has <span class="highlight">diabetes mellitus</span>.'
        ]
      },
      title: 'diabetes mellitus',
      showCount: true,
      description: 'Description for diabetes mellitus'
    };
    result.dataText = JSON.stringify(result.data);
    return result;
  }
});
