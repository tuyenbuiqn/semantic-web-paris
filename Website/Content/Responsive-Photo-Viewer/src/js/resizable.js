import {
  $D,
  TOUCH_START_EVENT,
  TOUCH_MOVE_EVENT,
  TOUCH_END_EVENT,
  NS,
  EVENT_NS,
  PUBLIC_VARS
} from './constants';

import {
  setGrabCursor
} from './utilities';

const ELEMS_WITH_RESIZE_CURSOR = `html,body,.${NS}-modal,.${NS}-stage,.${NS}-button`;

export default {

  /**
   * ------------------------------
   * 1.modal resizable
   * 2.keep image in stage center
   * 3.other image limitations
   * ------------------------------
   *
   * [resizable]
   * @param  {[Object]} modal       [the modal element]
   * @param  {[Object]} stage       [the stage element]
   * @param  {[Object]} image       [the image element]
   * @param  {[Number]} minWidth    [the option of modalWidth]
   * @param  {[Number]} minHeight   [the option of modalHeight]
   */
  resizable(modal, stage, image, minWidth, minHeight) {

    let self = this;

    let resizableHandleE = $(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-e"></div>`),
      resizableHandleW = $(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-w"></div>`),
      resizableHandleS = $(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-s"></div>`),
      resizableHandleN = $(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-n"></div>`),
      resizableHandleSE = $(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-se"></div>`),
      resizableHandleSW = $(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-sw"></div>`),
      resizableHandleNE = $(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-ne"></div>`),
      resizableHandleNW = $(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-nw"></div>`);

    let resizableHandles = {
      'e': resizableHandleE,
      's': resizableHandleS,
      'se': resizableHandleSE,
      'n': resizableHandleN,
      'w': resizableHandleW,
      'nw': resizableHandleNW,
      'ne': resizableHandleNE,
      'sw': resizableHandleSW
    };

    $(modal).append(
      resizableHandleE, resizableHandleW, resizableHandleS, resizableHandleN,
      resizableHandleSE, resizableHandleSW, resizableHandleNE, resizableHandleNW
    );

    let isDragging = false;

    let startX = 0,
      startY = 0,

      modalData = {
        w: 0,
        h: 0,
        l: 0,
        t: 0
      },
      stageData = {
        w: 0,
        h: 0,
        l: 0,
        t: 0
      },
      imageData = {
        w: 0,
        h: 0,
        l: 0,
        t: 0
      },

      // ?? is the difference between image width and height
      ?? = 0,
      imgWidth = 0,
      imgHeight = 0,

      direction = '';

    // modal CSS options
    let getModalOpts = function (dir, offsetX, offsetY) {

      // Modal should not move when its width to the minwidth
      let modalLeft = (-offsetX + modalData.w) > minWidth ? (offsetX + modalData.l) : (modalData.l + modalData.w - minWidth),
        modalTop = (-offsetY + modalData.h) > minHeight ? (offsetY + modalData.t) : (modalData.t + modalData.h - minHeight);

      let opts = {
        'e': {
          width: Math.max((offsetX + modalData.w), minWidth) + 'px'
        },
        's': {
          height: Math.max((offsetY + modalData.h), minHeight) + 'px'
        },
        'se': {
          width: Math.max((offsetX + modalData.w), minWidth) + 'px',
          height: Math.max((offsetY + modalData.h), minHeight) + 'px'
        },
        'w': {
          width: Math.max((-offsetX + modalData.w), minWidth) + 'px',
          left: modalLeft + 'px'
        },
        'n': {
          height: Math.max((-offsetY + modalData.h), minHeight) + 'px',
          top: modalTop + 'px'
        },
        'nw': {
          width: Math.max((-offsetX + modalData.w), minWidth) + 'px',
          height: Math.max((-offsetY + modalData.h), minHeight) + 'px',
          top: modalTop + 'px',
          left: modalLeft + 'px'
        },
        'ne': {
          width: Math.max((offsetX + modalData.w), minWidth) + 'px',
          height: Math.max((-offsetY + modalData.h), minHeight) + 'px',
          top: modalTop + 'px'
        },
        'sw': {
          width: Math.max((-offsetX + modalData.w), minWidth) + 'px',
          height: Math.max((offsetY + modalData.h), minHeight) + 'px',
          left: modalLeft + 'px'
        }
      };

      return opts[dir];
    };

    // image CSS options
    let getImageOpts = function (dir, offsetX, offsetY) {

      // Image should not move when modal width to the min width
      // The minwidth is modal width, so we should clac the stage minwidth
      let widthDiff = (offsetX + modalData.w) > minWidth ? (stageData.w - imgWidth + offsetX - ??) : (minWidth - (modalData.w - stageData.w) - imgWidth - ??),
        heightDiff = (offsetY + modalData.h) > minHeight ? (stageData.h - imgHeight + offsetY + ??) : (minHeight - (modalData.h - stageData.h) - imgHeight + ??),

        widthDiff2 = (-offsetX + modalData.w) > minWidth ? (stageData.w - imgWidth - offsetX - ??) : (minWidth - (modalData.w - stageData.w) - imgWidth - ??),
        heightDiff2 = (-offsetY + modalData.h) > minHeight ? (stageData.h - imgHeight - offsetY + ??) : (minHeight - (modalData.h - stageData.h) - imgHeight + ??);

      // Get image position in dragging
      let imgLeft = (widthDiff > 0 ? $(image).position().left : ($(image).position().left < 0 ? $(image).position().left : 0)) - ??,
        imgTop = (heightDiff > 0 ? $(image).position().top : ($(image).position().top < 0 ? $(image).position().top : 0)) + ??,

        imgLeft2 = (widthDiff2 > 0 ? $(image).position().left : ($(image).position().left < 0 ? $(image).position().left : 0)) - ??,
        imgTop2 = (heightDiff2 > 0 ? $(image).position().top : ($(image).position().top < 0 ? $(image).position().top : 0)) + ??;

      let opts = {
        'e': {
          left: widthDiff >= -?? ? ((widthDiff - ??) / 2 + 'px') : (imgLeft > widthDiff ? (imgLeft + 'px') : (widthDiff + 'px'))
        },
        's': {
          top: heightDiff >= ?? ? ((heightDiff + ??) / 2 + 'px') : (imgTop > heightDiff ? (imgTop + 'px') : (heightDiff + 'px'))
        },
        'se': {
          top: heightDiff >= ?? ? ((heightDiff + ??) / 2 + 'px') : (imgTop > heightDiff ? (imgTop + 'px') : (heightDiff + 'px')),
          left: widthDiff >= -?? ? ((widthDiff - ??) / 2 + 'px') : (imgLeft > widthDiff ? (imgLeft + 'px') : (widthDiff + 'px'))
        },
        'w': {
          left: widthDiff2 >= -?? ? ((widthDiff2 - ??) / 2 + 'px') : (imgLeft2 > widthDiff2 ? (imgLeft2 + 'px') : (widthDiff2 + 'px'))
        },
        'n': {
          top: heightDiff2 >= ?? ? ((heightDiff2 + ??) / 2 + 'px') : (imgTop2 > heightDiff2 ? (imgTop2 + 'px') : (heightDiff2 + 'px'))
        },
        'nw': {
          top: heightDiff2 >= ?? ? ((heightDiff2 + ??) / 2 + 'px') : (imgTop2 > heightDiff2 ? (imgTop2 + 'px') : (heightDiff2 + 'px')),
          left: widthDiff2 >= -?? ? ((widthDiff2 - ??) / 2 + 'px') : (imgLeft2 > widthDiff2 ? (imgLeft2 + 'px') : (widthDiff2 + 'px'))
        },
        'ne': {
          top: heightDiff2 >= ?? ? ((heightDiff2 + ??) / 2 + 'px') : (imgTop2 > heightDiff2 ? (imgTop2 + 'px') : (heightDiff2 + 'px')),
          left: widthDiff >= -?? ? ((widthDiff - ??) / 2 + 'px') : (imgLeft > widthDiff ? (imgLeft + 'px') : (widthDiff + 'px'))
        },
        'sw': {
          top: heightDiff >= ?? ? ((heightDiff + ??) / 2 + 'px') : (imgTop > heightDiff ? (imgTop + 'px') : (heightDiff + 'px')),
          left: widthDiff2 >= -?? ? ((widthDiff2 - ??) / 2 + 'px') : (imgLeft2 > widthDiff2 ? (imgLeft2 + 'px') : (widthDiff2 + 'px'))
        }
      };

      return opts[dir];
    };

    let dragStart = function (dir, e) {

      e = e || window.event;

      e.preventDefault();

      isDragging = true;
      PUBLIC_VARS['isResizing'] = true;

      startX = e.type === 'touchstart' ? e.originalEvent.targetTouches[0].pageX : e.clientX;
      startY = e.type === 'touchstart' ? e.originalEvent.targetTouches[0].pageY : e.clientY;

      // Reclac the modal data when mousedown
      modalData = {
        w: $(modal).width(),
        h: $(modal).height(),
        l: $(modal).offset().left,
        t: $(modal).offset().top
      };

      stageData = {
        w: $(stage).width(),
        h: $(stage).height(),
        l: $(stage).offset().left,
        t: $(stage).offset().top
      };

      imageData = {
        w: $(image).width(),
        h: $(image).height(),
        l: $(image).position().left,
        t: $(image).position().top
      };

      // ?? is the difference between image width and height
      ?? = !self.isRotated ? 0 : (imageData.w - imageData.h) / 2;
      imgWidth = !self.isRotated ? imageData.w : imageData.h;
      imgHeight = !self.isRotated ? imageData.h : imageData.w;

      direction = dir;

      // Add resizable cursor
      $(ELEMS_WITH_RESIZE_CURSOR).css('cursor', dir + '-resize');

      $D.on(TOUCH_MOVE_EVENT + EVENT_NS, dragMove)
        .on(TOUCH_END_EVENT + EVENT_NS, dragEnd);

    };

    let dragMove = function (e) {

      e = e || window.event;

      e.preventDefault();

      if (isDragging && !self.isMaximized) {

        let endX = e.type === 'touchmove' ? e.originalEvent.targetTouches[0].pageX : e.clientX,
          endY = e.type === 'touchmove' ? e.originalEvent.targetTouches[0].pageY : e.clientY,

          relativeX = endX - startX,
          relativeY = endY - startY;

        let modalOpts = getModalOpts(direction, relativeX, relativeY);

        $(modal).css(modalOpts);

        let imageOpts = getImageOpts(direction, relativeX, relativeY);

        $(image).css(imageOpts);

      }

    };

    let dragEnd = function () {

      $D.off(TOUCH_MOVE_EVENT + EVENT_NS, dragMove)
        .off(TOUCH_END_EVENT + EVENT_NS, dragEnd);

      // Set grab cursor
      if (PUBLIC_VARS['isResizing']) {
        setGrabCursor({ w: imgWidth, h: imgHeight }, { w: $(stage).width(), h: $(stage).height() },
          stage
        );
      }

      isDragging = false;
      PUBLIC_VARS['isResizing'] = false;

      // Remove resizable cursor
      $(ELEMS_WITH_RESIZE_CURSOR).css('cursor', '');

    };

    $.each(resizableHandles, function (dir, handle) {
      handle.on(TOUCH_START_EVENT + EVENT_NS, function (e) {
        dragStart(dir, e);
      });
    });

  }

}
