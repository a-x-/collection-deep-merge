import test from 'ava';
import mergeCollectionsBy, { findIndex } from '.';

test('create specialized instance', t => {
  t.is(typeof mergeCollectionsBy('a'), 'function');
});

test('findIndex works as expected', t => {
  t.is(findIndex([{a:2, c:-1}, {a:3}], item2 => item2['a'] === 2),
    0);
});

test('merge lists as expected', async t => {
  const mergeById = mergeCollectionsBy('a')

  t.deepEqual(mergeById([{a:1}, {a:2, b:0}], [{a:2, c:-1}, {a:3}]),
    [{a:1}, {a:2, b:0, c:-1}, {a:3}]);
});
