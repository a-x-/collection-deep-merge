# collection-deep-merge [![Build Status](https://travis-ci.org/a-x-/collection-deep-merge.svg?branch=master)](https://travis-ci.org/a-x-/collection-deep-merge)

Merge arrays of objects by key.

## usage

> Open [test.js](https://github.com/a-x-/collection-deep-merge/blob/master/test.js) with examples

```js
const mergeById = mergeCollectionsBy('id')

//
// Deep merge object-items
const list1 = [ { a: 1, b: { c: 1 } }, { a: 2, b: { d: 2 } } ];
const list2 = [ { a: 1, b: { c: 3 } }, { a: 2, b: { c: 4 } } ];
const merged = [ { a: 1, b: { c: 3 } }, { a: 2, b: { c: 4, d: 2 } } ];

mergeById(list, [ item ]) ==== merged // deep equal

//
// Merge item with a collection
const list = [ { a: 1, b: 2 }, { a: 2, d: 4 } ];
const item = { a: 1, c: 3 };
const merged = [{ a: 1, b: 2, c: 3 }, { a: 2, d: 4 }]

mergeById(list, [ item ]) ==== merged // deep equal
```
