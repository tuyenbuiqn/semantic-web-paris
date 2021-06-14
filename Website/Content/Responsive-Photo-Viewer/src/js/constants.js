import defaults from './defaults';
import { supportTouch } from './utilities';

export const $W = $(window);
export const $D = $(document);

export const CLICK_EVENT = 'click';
export const RESIZE_EVENT = 'resize';
export const KEYDOWN_EVENT = 'keydown';
export const WHEEL_EVENT = 'wheel mousewheel DOMMouseScroll';

export const TOUCH_START_EVENT = supportTouch() ? 'touchstart' : 'mousedown';
export const TOUCH_MOVE_EVENT = supportTouch() ? 'touchmove' : 'mousemove';
export const TOUCH_END_EVENT = supportTouch() ? 'touchend' : 'mouseup';

export const NS = 'photoviewer';
export const CLASS_NS = '.' + NS;
export const EVENT_NS = '.' + NS;

export const PUBLIC_VARS = {
  // image moving flag
  isMoving: false,
  // modal resizing flag
  isResizing: false,
  // modal z-index setting
  zIndex: defaults.zIndex,
};
