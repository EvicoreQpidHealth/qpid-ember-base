import Ember from 'ember';
import layout from '../templates/components/q-table';
import Resizing from '../mixins/resizing';

export default Ember.Component.extend(Resizing, {
  layout,
  classNames: ['main-table', 'flex-wrapper'],
  foundation: Ember.inject.service('foundationService'),
  sortAscending: true,

  allChecked: Ember.computed('content.@each.isChecked', {
    get() {
      let content = this.get('content');
      return Ember.isPresent(content) && content.isEvery('isChecked');
    },
    set(key, value) {
      this.get('content').setEach('isChecked', value);
      return value;
    }
  }),

  didInsertElement() {
    this.$('.main-table-padding').bind('scroll', () => {
      this.didScroll();
    });

    // Binding to thead and not the entire document is required because of reflow's stupidity
    $(`#${this.elementId} thead`).foundation('tooltip', 'reflow');

    this.get('foundation').reflow('dropdown');
    this.resizeCols();
    this.set('resizeHandler', () => this.resizeCols());
    $(window).on('resize', this.get('resizeHandler'));
  },

  willDestroyElement() {
    this.$('.main-table-padding').unbind('scroll');
    $(window).off('resize', this.get('resizeHandler'));
  },

  resizeCols() {
    Ember.run.scheduleOnce('afterRender', () => {
      this.$('.th-content').each((i, e) => this.$(e).css('max-width', this.$(e).parent().width()));
    });
  },

  didScroll() {
    if (this.get('infiniteScroll') && !this.get('noMoreData') && this.isScrolledToBottom()) {
      if (!this.get('isLoading')) {
        this.set('isLoading', true);
        this.attrs.loadMore(this.get('content.length')).then((count) => {
          this.set('isLoading', false);
          if (count === 0) {
            this.set('noMoreData', true);
          }
          this.resizeCols();
        });
      }
    }
  },

  // we check if we are at the bottom of the page
  isScrolledToBottom() {
    let parentElement = $(`#${this.elementId} .main-table-padding`);
    let childElement = $(`#${this.elementId} table`);
    let distanceToViewportTop = childElement.height() - parentElement.height();
    let viewPortTop = parentElement.scrollTop();
    if (viewPortTop === 0) {
      // if we are at the top of the page, don't do
      // the infinite scroll thing
      return false;
    }
    return (distanceToViewportTop - viewPortTop <= 10);
  },

  filterAtColumn(col) {
    let filters = this.get('filters');
    if (col in filters) {
      return filters[col];
    }
    return null;
  },

  cleanFilters() {
    let filterDict = {};
    for (let key in this.get('filters')) {
      if (this.get('filters').hasOwnProperty(key)) {
        let value = this.get('filters')[key];
        if (!Ember.isEmpty(value)) {
          filterDict[key] = value;
        }
      }
    }
    return filterDict;
  },

  doUpdateContent() {
    this.set('noMoreData', false);
    this.set('isLoading', true);
    this.set('content', []);
    this.attrs.updateContent(this.get('currentSort'), this.get('sortAscending'), this.cleanFilters()).then(() => {
      this.set('isLoading', false);
      this.resizeCols();
    });
  },

  actions: {
    select(row, index) {
      if (this.get('selectable')) {
        this.set('selectedRow', row);
        this.sendAction('select', row, index);
      }
    },

    setSort(col) {
      if (this.get('currentSort') === Ember.get(col, 'field')) {
        this.toggleProperty('sortAscending');
      } else {
        this.set('currentSort', Ember.get(col, 'field'));
        this.set('sortAscending', true);
      }
      this.doUpdateContent();
    },

    saveFilter(key, value) {
      // Can't use set because of dots in property names
      this.get('filters')[key] = value;
      this.doUpdateContent();
    },

    delete(row) {
      this.sendAction('delete', row);
    },

    linkClick(col, row) {
      this.sendAction('linkClick', col, row);
    },

    change(row) {
      this.sendAction('change', row);
    }
  }
});
