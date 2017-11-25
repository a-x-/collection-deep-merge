import test from 'ava';
import mergeCollectionsBy, { findIndex, mergeShallow } from '.';

const mergeById = mergeCollectionsBy('id')

test('require is ok', t => {
  const mergeCollectionsBy_ = require('.');
  t.is(typeof mergeCollectionsBy_, 'function');
});

test('create specialized instance', t => {
  t.is(typeof mergeCollectionsBy('a'), 'function');
});

test('findIndex works as expected', t => {
  t.is(findIndex([{id:2, c:-1}, {id:3}], item2 => item2['id'] === 2),
    0);
});

//
//
//

test('merge lists by key', t => {
  const list1 = [ { id: 1 }, {id: 2, b: 0 } ];
  const list2 = [ { id: 2, c: -1 }, { id: 3 } ];
  const merged = [ { id: 1 }, { id: 2, b: 0, c: -1 }, { id: 3 } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

test('merge lists deeply', t => {
  const list1 = [ { id: 1, b: { c: 1 } }, { id: 2, b: { d: 2 } } ];
  const list2 = [ { id: 1, b: { c: 3 } }, { id: 2, b: { c: 4 } } ];
  const merged = [ { id: 1, b: { c: 3 } }, { id: 2, b: { c: 4, d: 2 } } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

test('deep merge object-items', t => {
  const list1 = [ { id: 1, b: { c: 1 } }, { id: 2, b: { d: 2 } } ];
  const list2 = [ { id: 1, b: { c: 3 } }, { id: 2, b: { c: 4 } } ];
  const merged = [ { id: 1, b: { c: 3 } }, { id: 2, b: { c: 4, d: 2 } } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

test('no so cool merge deep nested arrays', t => {
  const list1 = [ { id: 1, b: [1] }, { id: 2, b: [2] } ];
  const list2 = [ { id: 1, b: [3] }, { id: 2, b: [4] } ];
  const merged = [ { id: 1, b: [3] }, { id: 2, b: [4] } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

test('merge item with a collection', t => {
  const list = [ { id: 1, b: 2 }, { id: 2, d: 4 } ];
  const item = { id: 1, c: 3 };
  const merged = [{ id: 1, b: 2, c: 3 }, { id: 2, d: 4 }]

  t.deepEqual(mergeById(list, [ item ]), merged);
});

test('add new item into collection', t => {
  const list = [ { id: 2, b: 2 }, { id: 3, d: 4 } ];
  const item = { id: 1, c: 3 };
  const merged = [ { id: 2, b: 2 }, { id: 3, d: 4 }, { id: 1, c: 3 } ];

  t.deepEqual(mergeById(list, [ item ]), merged);
});

test('join collections with no intersected keys', t => {
  const list1 = [ { id: 1, b: 11 }, { id: 2, b: 12 } ];
  const list2 = [ { id: 3, b: 13 }, { id: 4, b: 14 } ];
  const merged = [ { id: 1, b: 11 }, { id: 2, b: 12 }, { id: 3, b: 13 }, { id: 4, b: 14 } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

test('merge item with less deep properties', t => {
  const list1 = [ { id: 1, b: { c: 1 } } ];
  const list2 = [ { id: 1 } ];
  const merged = [ { id: 1, b: { c: 1 } } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

//
//
//

test('shallow merger', t => {
  const mergeShallowById = mergeCollectionsBy('id', { merge: mergeShallow });

  const list1 = [ { id: 1, b: { c: 1 } }, { id: 2, b: { d: 2 } } ];
  const list2 = [ { id: 1, b: { c: 3 } }, { id: 2, b: { c: 4 } } ];
  const merged = [ { id: 1, b: { c: 3 } }, { id: 2, b: { c: 4 } } ];

  t.deepEqual(mergeShallowById(list1, list2), merged);
});
