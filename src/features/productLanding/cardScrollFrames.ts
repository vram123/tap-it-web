/** Cropped tiles from the 3×4 product sprite (`photos/card-scroll/12-*.png`). */
export const CARD_SCROLL_FRAMES = [
  require('../../../photos/card-scroll/12-frontal.png'),
  require('../../../photos/card-scroll/12-quarter-left.png'),
  require('../../../photos/card-scroll/12-quarter-right.png'),
  require('../../../photos/card-scroll/12-top-tilt.png'),
  require('../../../photos/card-scroll/12-rotate-45.png'),
  require('../../../photos/card-scroll/12-edge-on.png'),
  require('../../../photos/card-scroll/12-close-angle.png'),
  require('../../../photos/card-scroll/12-top-down.png'),
  require('../../../photos/card-scroll/12-double-rotation.png'),
  require('../../../photos/card-scroll/12-underneath.png'),
  require('../../../photos/card-scroll/12-edge-macro.png'),
  require('../../../photos/card-scroll/12-dynamic-side.png'),
] as const;

export const CARD_SCROLL_FRAME_COUNT = CARD_SCROLL_FRAMES.length;
