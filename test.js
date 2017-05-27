import test from 'ava';
import lib from '.';

test('foo', t => {
	t.pass();
});

test('bar', async t => {
	const bar = Promise.resolve('bar');

	t.is(await bar, 'bar');
});"

/*
  todo: write tests
  const mergeById = mergeCollectionsBy('a')

  mergeById([{a:1}, {a:2, b:0}], [{a:2, c:-1}, {a:3}])
  // -> [{a:1}, {a:2, b:0, c:-1}, {a:3}]

  findIndex([{a:2, c:-1}, {a:3}], item2 => item2['a'] === 2);
  // -> 0
*/
