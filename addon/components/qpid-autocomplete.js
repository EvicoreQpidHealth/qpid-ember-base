import Ember from 'ember';
import layout from '../templates/components/qpid-autocomplete';
import KEYCODES from '../utils/keycodes';

const {
  Component,
  computed,
  A,
  isPresent,
  RSVP
} = Ember;

const { debounce } = Ember.run;

export default Component.extend({
  layout,

  classNames: ['qpid-autocomplete'],

  debounceTime: 400,
  header: { isHeader: true },

  /**
    If we should yield a header in search results. See app-search-patient
    component for example usage.
    @default false
  */
  showHeaderInResults: false,
  hasSuggestions: computed.gt('suggestions.length', 0),
  shouldShowHeader: computed.and('showHeaderInResults', 'hasSuggestions'),
  allowUnsuggestedValues: false,

  /**
    Array of suggestions to populate the results list.
  */
  suggestions: null,

  /**
    The index of the highlighted suggestion.
  */
  _highlightIndex: null,

  /**
    What the user has actually typed. Useful to highlight that term in formatted
    results. Component will yield out `userInput` with each `result`.
  */
  userInput: null,

  /**
    String of classes to be applied to the text input.
  */
  inputClass: null,

  /**
    Boolean: Is the autocomplete currently fetching data?
  */
  isLoading: false,

  /**
    Boolean: Is there (possibly) more data to load?
  */
  canLoadMore: false,

  /**
    Boolean: Is this being invoked from Note Viewer?
    Needed for hack to make this component render correctly there
  */
  isNoteViewer: false,

  /**
    Boolean to toggle the suggestions display list
  */
  _shouldShowSuggestions: false,

  shouldShowSuggestions: computed('shouldShowSuggestions', {
    get() {
      return this.get('_shouldShowSuggestions');
    },
    set(key, value) {
      if (value) {
        this.addScrollListener();
      } else {
        if (this.$('#autocomplete')) {
          this.removeScrollListener();
        }
      }
      this.set('_shouldShowSuggestions', value);
      return value;
    }
  }),

  /**
    Boolean to toggle whether the down arrow should be shown
    HACK to always disable this from NoteViewer: otherwise, the component
    doesn't render correctly there
  */
  shouldHideDownArrow: Ember.computed('shouldShowSuggestions', 'isNoteViewer', function() {
    return this.get('shouldShowSuggestions') || this.get('isNoteViewer');
  }),

  /**
    Boolean: Are we fetching data for a new query string?
  */
  isLoadingNewQuery: Ember.computed('isLoading', 'hasSuggestions', function() {
    return this.get('isLoading') && !this.get('hasSuggestions');
  }),

  /**
    Boolean: Are we fetching more data for the previous query?
  */
  isLoadingAdditionalSuggestions: Ember.computed('isLoading', 'hasSuggestions', function() {
    return this.get('isLoading') && this.get('hasSuggestions');
  }),

  init() {
    this._super(...arguments);

    // TODO: support finite list as well as query action
    let hasAction = isPresent(this.getAttr('searchQueryAction'));
    Ember.assert('You must pass a closure action that contains a promise to qpid-autocomplete. {{qpid-autocomplete searchQueryAction=(action "doSearch")}}', hasAction);

    this.set('shouldShowSuggestions', this.showSuggestionsOnInit || false);
    this._highlightIndex = -1;
    this._queuedRequests = [];
    this._populateSuggestionsWithSelectedValue();
  },

  _populateSuggestionsWithSelectedValue() {
    let selectedValue = this.getAttr('selectedValue');

    if (isPresent(selectedValue)) {
      this.set('suggestions', new A([selectedValue]));
      this.set('_highlightIndex', 0);
    }
  },

  didInsertElement() {
    this.$().on('keydown', 'input', this._cancelSearchIfTab.bind(this));
    this.set('autoCompleteId', `${this.get('element.id')}-autocomplete`);
  },

  willDestroyElement() {
    this.$().off('keydown', 'input', this._cancelSearchIfTab.bind(this));
    this.removeScrollListener();
  },

  /**
    Catches a tab event before focusOut is called so we can handle it internally.
  */
  _cancelSearchIfTab(e) {
    if (e.keyCode === KEYCODES.TAB) {
      this.send('cancelSearch');
    }
  },

  _cancelSearch(e) {
    let elementTarget = $(e.target).closest('.qpid-autocomplete');
    // if user clicks outside of the autocomplete component
    if (elementTarget.length === 0) {
      this.send('cancelSearch');
    }
    // if user clicks on a different autocomplete component
    else if (elementTarget.length > 0 && elementTarget.attr('id') !== this.elementId) {
      this.send('cancelSearch');
    }
    // if user clicks on the same autocomplete component
    // else if (elementTarget.length > 0 && elementTarget.attr('id') === this.elementId) {
    // }
  },

  /**
    The string used for the value of the text input.

    Returns selectedValue or the input it was changed to, debouncing a request
    to populate the suggestion list.
  */
  searchInputText: computed('formattedLabel', {
    get() {
      return this.get('formattedLabel');
    },

    set(key, value) {
      this._debounceInputChanged(false, value);
      this._setOrCancelLoadingState();
      this.set('suggestions', []);
      return value;
    }
  }),

  debounceReference: null,
  _debounceInputChanged(runNow, val) {
    if (runNow) {
      Ember.run.cancel(this.debounceReference);
      val = this.get('searchInputText');
    }
    this.debounceReference = debounce(this, this._onInputChanged, val, this.get('debounceTime'), runNow);
  },

  _setOrCancelLoadingState(value) {
    if (isPresent(value)) {
      this.set('isLoading', true);
    } else {
      this._reset();
      this.set('shouldShowSuggestions', false);
    }
  },

  /**
    Default selectedLabelFormatter. Uses value as label but can be overridden
    to provide custom input labels.
  */
  selectedLabelFormatter: computed(() => {
    return function(value) {
      return value;
    };
  }),

  /**
    Returns a formatted label based on selectedLabelFormatter.
  */
  formattedLabel: computed('selectedLabelFormatter', 'selectedValue', function() {
    let formatter = this.get('selectedLabelFormatter');
    let value = this.get('selectedValue');

    return formatter(value);
  }),

  /**
    If the user has changed the search.
    @returns { Boolean } if the search has changed
    @default false
  */
  hasSearchChanged: computed('selectedValue', 'previousSearch', function() {
    let previous = this.get('previousSearch');
    let selectedValue = this.get('selectedValue');

    return previous && previous !== selectedValue;
  }),

  /**
    Fetches the suggestion list via via the searchQueryAction parameter.
  */
  _onInputChanged(input) {
    if (this.get('isDestroyed')) {
      return;
    }

    this.set('userInput', input);

    if (input.length > 1) {
      this._setOrCancelLoadingState(input);
      this._loadSuggestionsForInput(input);
    }
  },

  _loadSuggestionsForInput(input) {
    this.set('shouldShowSuggestions', true);
    this.set('suggestions', []);

    let request = this.attrs.searchQueryAction(input);
    let queuedRequests = new A(this.get('_queuedRequests'));
    queuedRequests.pushObject(request);

    RSVP.all(queuedRequests).then((suggestions) => {
      this.set('suggestions', new A(suggestions).get('lastObject'));
      this.set('canLoadMore', true);
      this._reset();
    });
  },

  _loadMoreSuggestions() {
    if (this.getAttr('loadMore')) {
      let request = this.attrs.loadMore(this.get('searchInputText'));
      let queuedRequests = new A(this.get('_queuedRequests'));
      queuedRequests.pushObject(request);
      this._setOrCancelLoadingState(true);

      RSVP.all(queuedRequests).then((suggestions) => {
        let newSuggestions = new A(suggestions).get('lastObject');

        if (newSuggestions.length === 0) {
          this.set('canLoadMore', false);
        } else {
          this.get('suggestions').pushObjects(newSuggestions);
        }
        this._reset();
      });
    }
  },

  /**
    Resets the highlight index and if the user has selected something.
  */
  _reset() {
    this.set('isLoading', false);
    this.set('_highlightIndex', -1);
    this.set('hasSelectedSuggestion', false);
    this.set('_queuedRequests', []);
  },

  /**
    On focus, shows the suggestion list and saves the current input value.
  */
  focusIn() {
    let changedSearch = this.get('hasSearchChanged');
    let previous = this.get('previousSearch');
    let selectedValue = this.get('selectedValue');

    if (!previous || changedSearch) {
      this.set('previousSearch', selectedValue);
    }

    if (isPresent(selectedValue)) {
      this.$('input').select();
      this.set('shouldShowSuggestions', true);
    }

    Ember.$(document).on('click', this._cancelSearch.bind(this));
  },

  /**
    Originally: Prevents click listener set on focusIn from bubbling out of this component
    if click occurs from within.
    Now: Please refer to comments in _cancelSearch(e)
  */
  // click(e) {
  //   e.stopPropagation();
  // },

  /**
    Changes the currently highlighted item on down/up arrow keyUp.
  */
  keyUp(event) {
    let highlightIndex = this.get('_highlightIndex');
    let suggestionLength = this.get('suggestions.length');
    let suggestions = Ember.A(this.get('suggestions'));
    let newIndex, item;

    switch (event.keyCode) {
      case KEYCODES.DOWN_ARROW:
        newIndex = Math.min(suggestionLength - 1, highlightIndex + 1);
        this.set('_highlightIndex', newIndex);
        item = suggestions.objectAt(newIndex);
        this.send('highlightItem', item);
        break;
      case KEYCODES.UP_ARROW:
        newIndex = Math.max(0, highlightIndex - 1);
        this.set('_highlightIndex', newIndex);
        item = suggestions.objectAt(newIndex);
        this.send('highlightItem', item);
        break;
      case KEYCODES.ENTER:
        this.send('selectCurrentItem');
        break;
    }
  },

  /**
    Watch infinity loader element, when it's in view load more results
  */
  checkIfInView() {
    let buffer = 40;
    let selfOffset = this.$('.infinity-loader').position().top;
    let scrollable = this.$(`#${this.get('autoCompleteId')}`);
    let scrollableBottom = scrollable.height();
    let inView = selfOffset - buffer < scrollableBottom;

    if (inView && !this.get('isLoading')) {
      if (!this.get('isLoading')) {
        this._loadMoreSuggestions();
      }
    }
  },

  addScrollListener() {
    Ember.run.next(this, function() {
      this.$(`#${this.get('autoCompleteId')}`).on('scroll.autocomplete', () => {
        if (this.get('canLoadMore')) {
          Ember.run.throttle(this, this.checkIfInView, 50, false);
        }
      });
    });
  },

  removeScrollListener() {
    this.$(`#${this.get('autoCompleteId')}`).off('scroll.autocomplete');
  },

  actions: {
    /**
      Highlights an item in the list, updating the search input value.
    */
    highlightItem(item) {
      if (!item) {
        return;
      }

      // let property = this.getWithDefault('searchInputLabelProperty', 'name');
      // let selectedValue = Ember.get(item, property);
      this.set('selectedValue', item);
    },

    onEnter() {
      let suggestions = this.get('suggestions');
      let hasSearchChanged = this.get('hasSearchChanged');

      if (Ember.isEmpty(suggestions) && hasSearchChanged) {
        this._debounceInputChanged(true);
      } else {
        this.send('selectCurrentItem');
      }
    },

    /**
      Selects the currently highlighted item.
    */
    selectCurrentItem() {
      let suggestions = Ember.A(this.get('suggestions'));
      let highlightIndex = this.get('_highlightIndex');
      let item;

      if (this.get('isLoading')) {
        return;
      }

      if (highlightIndex === -1) {
        if (!this.get('allowUnsuggestedValues')) {
          item = suggestions.objectAt(0);
        } else {
          item = this.get('searchInputText');
        }
      } else {
        item = suggestions.objectAt(highlightIndex);
      }

      if (item) {
        this.send('selectItem', item);
      }
    },

    /**
      Selects an item, through selectCurrentItem or mouse click.
    */
    selectItem(item) {
      this.send('highlightItem', item);
      this.set('hasSelectedSuggestion', true);
      this.attrs.itemSelected(item);
      if (this.get('allowUnsuggestedValues')) {
        this.set('userInput', item);
      }
      this.send('cancelSearch');
    },

    clickMessage() {
      this.set('hasSelectedSuggestion', true);
      if (this.attrs.selectNoResults) {
        this.attrs.selectNoResults();
      }
      this.send('cancelSearch');
    },

    onEscapePress() {
      this.send('cancelSearch');
      this.$(event.target).blur();
    },

    onKeyDown() {
      if (event.keyCode === 13) {
        this.$(event.target).blur();
        event.preventDefault();
        this.send('cancelSearch');
      }
    },

    cancelSearch() {
      if (this.isDestroyed) {
        return;
      }
      // this.$().blur();
      this.set('shouldShowSuggestions', false);

      Ember.$(document).off('click', this._cancelSearch.bind(this));

      let hasSelectedSuggestion = this.get('hasSelectedSuggestion');

      if (this.get('allowUnsuggestedValues')) {
        if (this.get('userInput')) {
          this.set('selectedValue', this.get('userInput'));
        }
        this.set('suggestions', []);
        this._populateSuggestionsWithSelectedValue();
        this.notifyPropertyChange('searchInputText');
      }

      if (!hasSelectedSuggestion) {
        if (!this.get('allowUnsuggestedValues')) {
          this.set('selectedValue', this.get('previousSearch'));
          this.set('userInput', null);
          this.set('suggestions', []);
          this._populateSuggestionsWithSelectedValue();
          this.notifyPropertyChange('searchInputText');
        }
      }
      if (this.getAttr('onCancel')) {
        this.attrs.onCancel();
      }
    }
  }
});
