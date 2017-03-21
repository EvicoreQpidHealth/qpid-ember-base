import Ember from 'ember';

function splice(str, pos, text) {
  return str.slice(0, pos) + text + str.slice(pos);
}

export function snippet(params) {
  let text = params.context;
  if (text) {
    if (params.snippetStartOffset != null && params.snippetEndOffset != null && params.snippetStartOffset >= 0 && params.snippetEndOffset >= 0) {
      text = splice(text, params.snippetEndOffset, '</span>');
      text = splice(text, params.snippetStartOffset, '<span class="highlight">');
    } else if (text.indexOf('|||MATCH|||') >= 0) {
      text = text.replace(/\|\|\|\/MATCH\|\|\|/g, '</span>');
      text = text.replace(/\|\|\|MATCH\|\|\|/g, '<span class="highlight">');
    }
  }
  return text;
}

export default Ember.Helper.helper(function([params]) {
  return snippet(params);
});
