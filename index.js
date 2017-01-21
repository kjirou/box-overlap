/**
 * @param {Object} params
 * @param {number} [params.top]
 * @param {number} [params.right]
 * @param {number} [params.bottom]
 * @param {number} [params.left]
 * @param {number} [params.x]
 * @param {number} [params.y]
 * @param {number} [params.width]
 * @param {number} [params.height]
 * @return {{top, left, bottom, right}}
 */
const normalizeToTopLeftBottomRight = (params) => {
  const points = {
    top: null,
    left: null,
    bottom: null,
    right: null,
  };

  Object.keys(points).forEach(k => {
    if (k in params) points[k] = params[k];
  });

  if ('x' in params && points.left === null) {
    points.left = params.x;
  }
  if ('y' in params && points.top === null) {
    points.top = params.y;
  }

  if (points.top === null || points.left === null) {
    throw new Error('`top` or `left` can not be calculated');
  }

  if ('width' in params && points.right === null) {
    points.right = points.left + params.width;
  }
  if ('height' in params && points.bottom === null) {
    points.bottom = points.top + params.height;
  }

  if (points.bottom === null || points.right === null) {
    throw new Error('`bottom` or `right` can not be calculated');
  }

  if (points.bottom < points.top) {
    throw new Error('`bottom` is less than `top`');
  } else if (points.right < points.left) {
    throw new Error('`right` is less than `left`');
  }

  return points;
};

/**
 * Check whether two boxes overlap
 * @param {Object} boxA - A value set like DOMRect (https://www.w3.org/TR/geometry-1/#DOMRect)
 *                        e.g. { top, left, bottom, right } or { x, y, width, height }
 * @param {Object} boxB
 * @return {boolean}
 */
const areBoxesOverlapping = (boxA, boxB) => {
  const a = normalizeToTopLeftBottomRight(boxA);
  const b = normalizeToTopLeftBottomRight(boxB);

  return (
    (
      a.top < b.top && a.bottom > b.top ||
      a.top > b.top && b.bottom > a.top ||
      a.top === b.top && a.top < a.bottom && b.top < b.bottom  // It means that both `a` and `b` have thickness
    )
    &&
    (
      a.left < b.left && a.right > b.left ||
      a.left > b.left && b.right > a.left ||
      a.left === b.left && a.left < a.right && b.left < b.right
    )
  );
};


module.exports = {
  _normalizeToTopLeftBottomRight: normalizeToTopLeftBottomRight,
  areBoxesOverlapping,
};
