import Ember from 'ember';
// https://developers.google.com/web/updates/2015/04/cut-and-copy-commands?hl=en
// https://developer.mozilla.org/en-US/docs/Web/API/Selection selection api
// https://developer.mozilla.org/en-US/docs/Web/API/Document/queryCommandSupported

export default function copyUtil(selector) {
  /*
  Known Bugs
  ~~Calling queryCommandSupported() for cut or copy always returns false
  until after a user interaction. This prevents you from disabling your
  UI for browsers which don’t actually support it.~~ Fixed on Chrome 48.
  */
  window.getSelection().removeAllRanges();

  let container = document.querySelector(selector);
  let range = document.createRange();
  range.selectNode(container);
  window.getSelection().addRange(range);

  try {
    // Now that we've selected the anchor text, execute the copy command
    let successful = document.execCommand('copy');
    let msg = successful ? 'successful' : 'unsuccessful';
    Ember.debug(`Copy command was ${msg}`);
  } catch(err) {
    Ember.debug('Oops, unable to copy');
  }

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported
  window.getSelection().removeAllRanges();
}
