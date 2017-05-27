# collection-deep-merge [![Build Status](https://travis-ci.org/a-x-/collection-deep-merge.svg?branch=master)](https://travis-ci.org/a-x-/collection-deep-merge)

## usage

```js
const mergeById = mergeCollectionsBy('id')

mergeById([{id:1}, {id:2, b:0}], [{id:2, c:-1}, {id:3}])
// -> [{id:1}, {id:2, b:0, c:-1}, {id:3}]

findIndex([{id:2, c:-1}, {id:3}], item2 => item2['id'] === 2);
// -> 0
```
