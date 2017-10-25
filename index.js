const merge = require('lodash.merge');

/**
 * Find first index like indexOf does, but by `filter(value)` instead of by `value`
 * @param {Collection} arr
 * @returns {?Number} index
 */
const findIndex =
function findIndex (arr, filter) {
  if ('findIndex' in arr) {
    const index = arr.findIndex(filter);
    return index !== -1 ? index : undefined;
  }

  let key = undefined;
  arr.forEach((val, key_) => key === undefined && filter(val, key) && (key = key_));
  return key;
}

/**
 * @example const mergeById = mergeCollectionsBy('id')
 * @example [{id:1}, {id:2, b:0}] + [{id:2, c:-1}, {id:3}] == [{id:1}, {id:2, b:0, c:-1}, {id:3}]
 */
exports.mergeCollectionsBy =
module.exports =
exports.default =
function mergeCollectionsBy (key) {
  /**
   * @param {Collection} c1
   * @param {Collection} c2
   * @returns {Collection}
   */
  return (c1, c2) => {
    const c2VisitedIdx = {} // e.g. 42: true
    const updatedC1 = c1.map(item1 => {
      const index2 = findIndex(c2, item2 => item2[key] === item1[key]);
      c2VisitedIdx[index2] = true;
      return index2 !== undefined
        ? merge({}, item1, c2[index2])
        : item1;
    });
    const c2Rest = c2.filter((_, key2) => !c2VisitedIdx[key2])
    return updatedC1.concat(c2Rest);
  };
};

/**
 * @typedef {Array<Object>} Collection
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

module.exports.findIndex =
exports.findIndex =
findIndex;
