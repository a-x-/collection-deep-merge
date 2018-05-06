'use strict'; // support node@4+

var mergeDeep_ = require('lodash.merge');
var mergeDeep = function (a, b) { return mergeDeep_({}, a, b); };
var cmpVal = function (a, b) { return a !== undefined && a === b; };

/**
 * findIndex Polyfill.
 *
 * Find first index like indexOf does, but by `filter(value)` instead of by `value`
 *
 * @param {Collection} arr
 * @returns {?Number} index
 */
var findIndex =
function findIndex (arr, filter) {
  if ('findIndex' in arr) {
    var index = arr.findIndex(filter);
    return index !== -1 ? index : undefined;
  }

  var key = undefined;
  arr.forEach(function (val, key_) { return key === undefined && filter(val, key) && (key = key_); });
  return key;
}


/**
 * @example const mergeById = mergeCollectionsBy('id')
 * @example [{id:1}, {id:2, b:0}] + [{id:2, c:-1}, {id:3}] == [{id:1}, {id:2, b:0, c:-1}, {id:3}]
 */
exports.mergeCollectionsBy =
module.exports =
exports.default =
function mergeCollectionsBy (key, opts) {
  var merge = opts && opts.merge || mergeDeep;
  var is = opts && opts.is || cmpVal;
  var shouldPutNewToBottom = opts && opts.shouldPutNewToBottom || true;

  /**
   * @param {Collection} c1
   * @param {Collection} c2
   * @returns {Collection}
   */
  return function mergeCollectionsByKey (c1, c2) {
    var c2VisitedIdx = {} // e.g. 42: true
    var updatedC1 = c1.map(function (item1) {
      var index2 = findIndex(c2, function (item2) { return is(item2[key], item1[key]); });
      c2VisitedIdx[index2] = true;
      return index2 !== undefined
        ? merge(item1, c2[index2])
        : item1;
    });
    var c2Rest = c2.filter(function (_, key2) { return !c2VisitedIdx[key2]; })
    return shouldPutNewToBottom ? updatedC1.concat(c2Rest) : c2Rest.concat(updatedC1);
  }
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


module.exports.mergeShallow =
exports.mergeShallow =
function (a, b) { return Object.assign({}, a, b); };

module.exports.mergeDeep =
exports.mergeDeep =
mergeDeep;
