import Ember from 'ember';
import layout from '../../templates/components/nav/q-tabs';

const {
  Component
} = Ember;

export default Component.extend({
  layout,
  tabFollowAnimationDuration: 200,

  didInsertElement() {
    this._highlightActiveLink();
  },

  /**
    Highlight the active tab, or the first one if nothing is active.
  */
  _highlightActiveLink() {
    let activeLink = this.$('a.active');
    activeLink = activeLink || this.$('a:first-of-type');

    this._followTab(activeLink);
  },

  /**
    Manually highlight a tab. Called from the child tab component on click.
  */
  activateTab(tab) {
    this._followTab(tab);
  },

  /**
    Animate "following" of a tab by changing width/position of a div that sits
    below them.
  */
  _followTab(tab) {
    let link = getLinkFromTab(tab);
    let linkWidth = link.outerWidth(true);
    let linkOffset = link.offset() || { left: 0 };
    let linkLeft = linkOffset.left;
    let thisLeft = this.$().offset().left;

    this.$('.tab-follow').animate({
      width: linkWidth,
      left: linkLeft - thisLeft
    }, this.get('tabFollowAnimationDuration'));
  }
});

/**
  Returns a jQuery object representing a link from a component or the object
  itself.
*/
function getLinkFromTab(tabOrLink) {
  if (tabOrLink.$) {
    // we were passed a component
    tabOrLink = tabOrLink.$('a');
  }

  return tabOrLink;
}
