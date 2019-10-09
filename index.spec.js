const mergeCollectionsBy = require('.');
const { findIndex, mergeShallow } = require('.');

const mergeById = mergeCollectionsBy('id');
const mergeByIdTop = mergeCollectionsBy('id', { shouldPutNewToBottom: false });
const mergeByIdBot = mergeCollectionsBy('id', { shouldPutNewToBottom: true });

test('require is ok', () => {
  const mergeCollectionsBy_ = require('.');
  expect(typeof mergeCollectionsBy_).toBe('function');
});

test('create specialized instance', () => {
  expect(typeof mergeCollectionsBy('a')).toBe('function');
});

test('findIndex', () => {
  expect(findIndex([{ id: 2, c: -1 }, { id: 3 }], item2 => item2['id'] === 2)).toBe(0);
});

//
//
//

test('merge lists by key', () => {
  const list1 = [{ id: 1 }, { id: 2, b: 0 }];
  const list2 = [{ id: 2, c: -1 }, { id: 3 }];
  const merged = [{ id: 1 }, { id: 2, b: 0, c: -1 }, { id: 3 }];

  expect(mergeById(list1, list2)).toEqual(merged);
});

test('merge lists deeply', () => {
  const list1 = [{ id: 1, b: { c: 1 } }, { id: 2, b: { d: 2 } }];
  const list2 = [{ id: 1, b: { c: 3 } }, { id: 2, b: { c: 4 } }];
  const merged = [{ id: 1, b: { c: 3 } }, { id: 2, b: { c: 4, d: 2 } }];

  expect(mergeById(list1, list2)).toEqual(merged);
});

test('deep merge object-items', () => {
  const list1 = [{ id: 1, b: { c: 1 } }, { id: 2, b: { d: 2 } }];
  const list2 = [{ id: 1, b: { c: 3 } }, { id: 2, b: { c: 4 } }];
  const merged = [{ id: 1, b: { c: 3 } }, { id: 2, b: { c: 4, d: 2 } }];

  expect(mergeById(list1, list2)).toEqual(merged);
});

test('no so cool merge deep nested arrays', () => {
  const list1 = [{ id: 1, b: [1] }, { id: 2, b: [2] }];
  const list2 = [{ id: 1, b: [3] }, { id: 2, b: [4] }];
  const merged = [{ id: 1, b: [3] }, { id: 2, b: [4] }];

  expect(mergeById(list1, list2)).toEqual(merged);
});

test('merge item with a collection', () => {
  const list = [{ id: 1, b: 2 }, { id: 2, d: 4 }];
  const item = { id: 1, c: 3 };
  const merged = [{ id: 1, b: 2, c: 3 }, { id: 2, d: 4 }]

  expect(mergeById(list, [item])).toEqual(merged);
});

test('add new item into collection', () => {
  const list = [{ id: 2, b: 2 }, { id: 3, d: 4 }];
  const item = { id: 1, c: 3 };
  const merged = [{ id: 2, b: 2 }, { id: 3, d: 4 }, { id: 1, c: 3 }];

  expect(mergeById(list, [item])).toEqual(merged);
});

test('join collections with no intersected keys', () => {
  const list1 = [{ id: 1, b: 11 }, { id: 2, b: 12 }];
  const list2 = [{ id: 3, b: 13 }, { id: 4, b: 14 }];
  const merged = [{ id: 1, b: 11 }, { id: 2, b: 12 }, { id: 3, b: 13 }, { id: 4, b: 14 }];

  expect(mergeById(list1, list2)).toEqual(merged);
});

test('merge item with less deep properties', () => {
  const list1 = [{ id: 1, b: { c: 1 } }];
  const list2 = [{ id: 1 }];
  const merged = [{ id: 1, b: { c: 1 } }];

  expect(mergeById(list1, list2)).toEqual(merged);
});

//
//
//

test('shallow merger', () => {
  const mergeShallowById = mergeCollectionsBy('id', { merge: mergeShallow });

  const list1 = [{ id: 1, b: { c: 1 } }, { id: 2, b: { d: 2 } }];
  const list2 = [{ id: 1, b: { c: 3 } }, { id: 2, b: { c: 4 } }];
  const merged = [{ id: 1, b: { c: 3 } }, { id: 2, b: { c: 4 } }];
  const deep = [{ id: 1, b: { c: 3 } }, { id: 2, b: { c: 4, d: 2 } }];

  expect(mergeShallowById(list1, list2)).toEqual(merged);
  expect(mergeById(list1, list2)).toEqual(deep);
});

test('shouldPutNewToBottom', () => {
  const list1 = [{ id: 2, b: { c: 1 } }];
  const top = [{ id: 1 }, { id: 2, b: { c: 1 } }];
  const bot = [{ id: 2, b: { c: 1 } }, { id: 1 }];

  expect(mergeByIdTop(list1, [{ id: 1 }])).toEqual(top);
  expect(mergeByIdBot(list1, [{ id: 1 }])).toEqual(bot);
  expect(mergeById(list1, [{ id: 1 }])).toEqual(bot);
  // opts has no effect here
  expect(mergeById(list1, [{ id: 1 }], { shouldPutNewToBottom: false })).toEqual(bot);
});
