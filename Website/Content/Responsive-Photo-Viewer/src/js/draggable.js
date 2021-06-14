import {
  $D,
  TOUCH_START_EVENT,
  TOUCH_MOVE_EVENT,
  TOUCH_END_EVENT,
  EVENT_NS,
  PUBLIC_VARS
} from './constants';

export default {

  /**
   * [draggable]
   * @param  {[Object]} modal       [the modal element]
   * @param  {[Object]} dragHandle  [the handle element when dragging]
   * @param  {[Object]} dragCancel  [the cancel element when dragging]
   */
  draggable(modal, dragHandle, dragCancel) {

    let self = this;

    let isDragging = false;

    let startX = 0,
      startY = 0,

      left = 0,
      top = 0;

    let dragStart = function (e) {

      e = e || window.event;

      // Must be removed
      // e.preventDefault();

      if (self.options.multiInstances) {
        modal.css('z-index', ++PUBLIC_VARS['zIndex']);
      }

      // Get clicked button
      let elemCancel = $(e.target).closest(dragCancel);
      // Stop modal moving when click buttons
      if (elemCancel.length) {
        return true;
      }

      isDragging = true;

      startX = e.type === 'touchstart' ? e.originalEvent.targetTouches[0].pageX : e.clientX;
      startY = e.type === 'touchstart' ? e.originalEvent.targetTouches[0].pageY : e.clientY;

      left = $(modal).offset().left;
      top = $(modal).offset().top;

      $D.on(TOUCH_MOVE_EVENT + EVENT_NS, dragMove)
        .on(TOUCH_END_EVENT + EVENT_NS, dragEnd);

    };

    let dragMove = function (e) {

      e = e || window.event;

      e.preventDefault();

      if (isDragging && !PUBLIC_VARS['isMoving'] && !PUBLIC_VARS['isResizing'] && !self.isMaximized) {

        let endX = e.type === 'touchmove' ? e.originalEvent.targetTouches[0].pageX : e.clientX,
          endY = e.type === 'touchmove' ? e.originalEvent.targetTouches[0].pageY : e.clientY,

          relativeX = endX - startX,
          relativeY = endY - startY;

        $(modal).css({
          left: relativeX + left + 'px',
          top: relativeY + top + 'px'
        });

      }

    };

    let dragEnd = function () {

      $D.off(TOUCH_MOVE_EVENT + EVENT_NS, dragMove)
        .off(TOUCH_END_EVENT + EVENT_NS, dragEnd);

      isDragging = false;

    };

    $(dragHandle).on(TOUCH_START_EVENT + EVENT_NS, dragStart);

  }

}
