import test from 'ava';
import mergeCollectionsBy, { findIndex, mergeShallow } from '.';

const mergeById = mergeCollectionsBy('a')

test('require is ok', t => {
  const mergeCollectionsBy_ = require('.');
  t.is(typeof mergeCollectionsBy_, 'function');
});

test('create specialized instance', t => {
  t.is(typeof mergeCollectionsBy('a'), 'function');
});

test('findIndex works as expected', t => {
  t.is(findIndex([{a:2, c:-1}, {a:3}], item2 => item2['a'] === 2),
    0);
});

test('merge lists by key', t => {
  const list1 = [ { a: 1 }, {a: 2, b: 0 } ];
  const list2 = [ { a: 2, c: -1 }, { a: 3 } ];
  const merged = [ { a: 1 }, { a: 2, b: 0, c: -1 }, { a: 3 } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

test('merge lists deeply', t => {
  const list1 = [ { a: 1, b: { c: 1 } }, { a: 2, b: { d: 2 } } ];
  const list2 = [ { a: 1, b: { c: 3 } }, { a: 2, b: { c: 4 } } ];
  const merged = [ { a: 1, b: { c: 3 } }, { a: 2, b: { c: 4, d: 2 } } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

test('deep merge object-items', t => {
  const list1 = [ { a: 1, b: { c: 1 } }, { a: 2, b: { d: 2 } } ];
  const list2 = [ { a: 1, b: { c: 3 } }, { a: 2, b: { c: 4 } } ];
  const merged = [ { a: 1, b: { c: 3 } }, { a: 2, b: { c: 4, d: 2 } } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

test('no so cool merge deep nested arrays', t => {
  const list1 = [ { a: 1, b: [1] }, { a: 2, b: [2] } ];
  const list2 = [ { a: 1, b: [3] }, { a: 2, b: [4] } ];
  const merged = [ { a: 1, b: [3] }, { a: 2, b: [4] } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

test('merge item with a collection', t => {
  const list = [ { a: 1, b: 2 }, { a: 2, d: 4 } ];
  const item = { a: 1, c: 3 };
  const merged = [{ a: 1, b: 2, c: 3 }, { a: 2, d: 4 }]

  t.deepEqual(mergeById(list, [ item ]), merged);
});

test('add new item into collection', t => {
  const list = [ { a: 2, b: 2 }, { a: 3, d: 4 } ];
  const item = { a: 1, c: 3 };
  const merged = [ { a: 2, b: 2 }, { a: 3, d: 4 }, { a: 1, c: 3 } ];

  t.deepEqual(mergeById(list, [ item ]), merged);
});

test('join collections with no intersected keys', t => {
  const list1 = [ { a: 1, b: 11 }, { a: 2, b: 12 } ];
  const list2 = [ { a: 3, b: 13 }, { a: 4, b: 14 } ];
  const merged = [ { a: 1, b: 11 }, { a: 2, b: 12 }, { a: 3, b: 13 }, { a: 4, b: 14 } ];

  t.deepEqual(mergeById(list1, list2), merged);
});

test('shallow merger', t => {
  const mergeShallowById = mergeCollectionsBy('a', { merge: mergeShallow });

  const list1 = [ { a: 1, b: { c: 1 } }, { a: 2, b: { d: 2 } } ];
  const list2 = [ { a: 1, b: { c: 3 } }, { a: 2, b: { c: 4 } } ];
  const merged = [ { a: 1, b: { c: 3 } }, { a: 2, b: { c: 4 } } ];

  t.deepEqual(mergeShallowById(list1, list2), merged);
});
