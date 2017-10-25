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

## use with immutable
facebook's [immutable](https://github.com/facebook/immutable-js) does not propose way to merge lists with expected behavior.

with `Proxy` browser API you can add into immutable fast getter by key/id without '.get(key)' like so:

```js
import { Iterable } from 'immutable';
const accesor = new Proxy(Object.prototype, {
  get: (target, property, receiver) => receiver.get(property),
});
Object.setPrototypeOf(Iterable.prototype, accesor);
```

Now you can merge collections by key in immutable-js.

```js
const l1 = List([Map({ id: 1 }), Map({ id: 2 })])
const updatedItem = Map({ id: 1, name: 'Deko Yuto', age: 121 })

// use getters
updatedItem.id // 1
updatedItem.get('id') // 1

const expected = List([
    Map({ id: 1, name: 'Deko Yuto', age: 121 }),
    Map({ id: 2 })
]);

// use collection-deep-merge
is(deepCollectionMerge('id')(l1, [updatedItem]), expected)
```
