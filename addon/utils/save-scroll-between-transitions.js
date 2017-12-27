import { merge } from '@ember/polyfills';

/**
  Remember and restore a container's scroll position when
  returning from a liquid fire transition.

  To use: import into a custom transition definition
  and set options when defining transistions.
*/

/**
  Example useage  when both ends of the transition need to remember the scroll position,
  and one side has the '.main.flex' element set to overflow rather than the liquid-child element

  this.transition(
    this.hasClass('selecting'),
    this.toValue(true),
    this.use('refreshToLeft', {
          newScrollSelector: '.main.flex',
          resumeScrollPos: true
        }),
    this.reverse('refreshToRight', {
        oldScrollSelector: '.main.flex',
        resumeScrollPos: true
      })
  );
*/

function scopedElement(element, selector) {
  return selector ? element.find(selector) : element;
}

export default function saveScrollPos(opts) {
  let options = {
    /**
      String: Selector for the previously animatied scrollable element.
      Selector passed should be child of liquid-child
      @default null (lquid-child container)
    */
    oldScrollSelector: null,
    /**
      String: Selector for the newly added animatied scrollable element.
      Selector passed should be child of liquid-child
      @default null (lquid-child container)
    */
    newScrollSelector: null,
    /**
      Boolean: True - remember & reset scroll position. False - don't attempt to change scroll position.
      @default False
    */
    resumeScrollPos: false
  };
  let scrollposition = this.oldElement.data('scrollPos');
  merge(options, opts);

  let $prevScrollElement = scopedElement(this.oldElement, options.oldScrollSelector);

  this.newElement.data('scrollPos', $prevScrollElement.scrollTop()); // store scroll position

  if (options.resumeScrollPos === true && scrollposition) {
    let $scrollElement = scopedElement(this.newElement, options.newScrollSelector);
    $scrollElement.scrollTop(scrollposition);
  }

  return options;
}
