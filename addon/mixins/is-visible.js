import Mixin from '@ember/object/mixin';
import { debounce, scheduleOnce } from '@ember/runloop';
import { on } from '@ember/object/evented';

export default Mixin.create({
  _bindScrollHandler() {
    let scrollHandler = this._onScroll.bind(this);
    this.$().closest('.scroll-container').bind('scroll', scrollHandler);
  },

  _isInViewport: false,

  _onScroll() {
    debounce(this, '_updateBoundingClientRect', this.get('_scrollTimeout'));
  },

  _scrollTimeout: 100,

  _setup: on('didInsertElement', function() {
    scheduleOnce('afterRender', () => {
      this.set('_windowHeight', window.innerHeight);
      this.set('_windowWidth', window.innerWidth);
      this._updateBoundingClientRect();
    });

    this._bindScrollHandler();
  }),

  _unbindScroll: on('willDestroyElement', function() {
    this.$().closest('.scroll-container').unbind('scroll');
  }),

  _updateBoundingClientRect() {
    let rect = this.$()[0].getBoundingClientRect();
    this._updateIsInViewport(rect);
  },

  _updateIsInViewport(rect) {
    let previouslyInView = this.get('_isInViewport');
    let currentlyInView = rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= this.get('_windowHeight') &&
      rect.right <= this.get('_windowWidth');

    if (currentlyInView && !previouslyInView) {
      this.set('_isInViewport', true);

      if (this.enteredViewport) {
        this.enteredViewport();
      }
    }

    if (!currentlyInView && previouslyInView) {
      this.set('_isInViewport', false);

      if (this.exitedViewport) {
        this.exitedViewport();
      }
    }

    if (currentlyInView) {
      if (this.isVisible) {
        this.isVisible();
      }
    }
  },

  _windowHeight: 0,

  _windowWidth: 0
});
