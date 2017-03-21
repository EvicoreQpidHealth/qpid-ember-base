/*globals $:true, jQuery:true*/
// TODO: replace $ with ES6 import (Ember.$)
// TODO: this should be set up by an initializer or even ApplicationView didInsertElement

(function($) {
  $.fn.closestDescendent = function(filter) {
    let $found = $();
    let $currentSet = this; // Current place
    while ($currentSet.length) {
      $found = $currentSet.filter(filter);
      if ($found.length) {
        break;  // At least one match: break loop
      }
      // Get all children of the current set
      $currentSet = $currentSet.children();
    }
    return $found.first(); // Return first match of the collection
  };
})(jQuery);

(function($) {
  $.fn.descendentsBefore = function(filter, stop) {
    let allFound = [];
    let $found = [];
    let $currentSet = this.children(); // Current place
    while ($currentSet.length) {
      $found = $currentSet.filter(filter).not(stop);
      if ($found.length) {
        allFound = $.merge(allFound, $found);
      }
      // Get all children of the current set
      $currentSet = $currentSet.not(stop).children();
    }
    let x = $();  // empty jQuery object
    $.each(allFound, function(i, o) {
      x = x.add(o);
    });
    return x;
  };
})(jQuery);

(function($) {
  let methods = { on: $.fn.on, bind: $.fn.bind };
  $.each(methods, function(k) {
    $.fn[k] = function() {
      let args = [].slice.call(arguments);
      let delay = args.pop();
      let fn = args.pop();
      let timer = null;

      args.push(function() {
        let self = this;
        let arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(self, [].slice.call(arg));
        }, delay);
      });

      return methods[k].apply(this, isNaN(delay) ? arguments : args);
    };
  });
}(jQuery));

/*******************************************************************************
 ** Column Heights
 @public
 ******************************************************************************/

function fixColumnHeight() {
  $('.card > .main-table').each(function() {
    $(this).height('auto');
    $(this).css('max-height', $(this).closest('.card').width());
  });

  // Columns without Views
  $('.flex-wrapper').each(function() {
    let totalFixedHeight = 0;

    $(this).descendentsBefore('.firm', '.flex-wrapper').each(function() {
      totalFixedHeight += $(this).outerHeight(true);
    });
    let numberOfDescendents = $(this).descendentsBefore('.flex', '.flex-wrapper').length;
    $(this).descendentsBefore('.flex', '.flex-wrapper').height(($(this).height() - totalFixedHeight) / numberOfDescendents);
  });
}

function fixCardWidth() {
  // Cards
  $('.card.multi-state').each(function() {
    $(this).toggleClass('small', ($(this).width() < 350));
  });
}

$(window).resize(function() {
  fixColumnHeight();
  fixCardWidth();
}, 100).resize();

$(document).on('close.fndtn.alert', function() {
  setTimeout(fixColumnHeight, 1);
});

/*******************************************************************************
 ** Card Checkboxes
 @public
 *****************************************************************************

$(document).on('click', '.card :checkbox', function (e) {
  return preventEvent(e);
});

$(document).on('click', '.card', function () {
  $(this).find(':checkbox').prop('checked', function (i, value) {
      return !value;
  });
});

*/

/*******************************************************************************
 ** Table Checkboxes
 @public
 *****************************************************************************

$(document).on('click', 'input[type=checkbox]', function () {
  $(this).closest('tr').toggleClass('selected');
});

$(document).on('click', 'thead input[type=checkbox]', function () {
  $(this).closest('table').find('tbody input[type=checkbox]').click();
});

*/

/*******************************************************************************
 ** Tab Animation
 @public
 ******************************************************************************/

$(document).on('click', '.tab-title a', function() {
  let btn = $(this);
  btn.closest('.tab-title').siblings('.tab-follow').animate({
    width: btn.outerWidth(true),
    left: btn.offset().left - btn.closest('.tabs').offset().left
  }, 200);
});

/*******************************************************************************
 ** Column Resize
 @public
 ******************************************************************************/

function preventEvent(e) {
  let ev = e || window.event;
  if (ev.preventDefault) {
    ev.preventDefault();
  } else {
    ev.returnValue = false;
  }
  if (ev.stopPropagation) {
    ev.stopPropagation();
  }
  return false;
}

function setupResizing() {
  let resize;

  $(document).on('mousedown', '.resize-space', function(e) {
    $(this).attr('previousX', e.pageX);
    resize = $(this);
    return preventEvent(e);
  });

  $(document).on('mouseup', '.resize-space', function(e) {
    resize = null;
    return preventEvent(e);
  });

  $(document)
    .mousemove(function(e) {
      if (resize) {
        let changeX = e.pageX - resize.attr('previousX');

        let col1 = resize.closest('.card-column');
        let col2 = col1.next().closestDescendent('.card-column');
        let row = col1.closest('.row');

        if (Math.floor(col1.width() + changeX) > 200 && Math.floor(col2.width() - changeX) > 200) {
          let col1PreviousPercent = col1[0].getBoundingClientRect().width / row[0].getBoundingClientRect().width * 100;
          let col2PreviousPercent = col2[0].getBoundingClientRect().width / row[0].getBoundingClientRect().width * 100;

          col1.css('width', `${col1PreviousPercent + (changeX / row[0].getBoundingClientRect().width * 100)}%`);
          col2.css('width', `${col2PreviousPercent - (changeX / row[0].getBoundingClientRect().width * 100)}%`);

          col2.find('.card-column').each(function() {
            if ($(this).width() < 200) {
              col1.css('width', `${col1PreviousPercent}%`);
              col2.css('width', `${col2PreviousPercent}%`);
            }
          });
        }

        resize.attr('previousX', e.pageX);
        fixCardWidth();
        return preventEvent(e);
      }
    })
    .mouseup(function() {
      resize = null;
    });
}

function resetColumnWidths() {
  // lazily omiting some others right now
  $('.medium-3').width('25%');
  $('.medium-6').width('50%');
  $('.medium-9').width('75%');
  $('.medium-12').width('100%');
  $('.medium-3').removeAttr('style');
  $('.medium-6').removeAttr('style');
  $('.medium-9').removeAttr('style');
  $('.medium-12').removeAttr('style');
}

function refreshLogic() {
  fixColumnHeight();
  fixCardWidth();
  setupResizing();
  resetColumnWidths();
}

export default refreshLogic;
