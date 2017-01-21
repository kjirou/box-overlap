# box-overlap

[![npm version](https://badge.fury.io/js/box-overlap.svg)](https://badge.fury.io/js/box-overlap)

Check whether two boxes overlap


## Installation

```bash
npm install box-overlap
```


## Usage

```js
const { areBoxesOverlapping } = require('box-overlap');

const a = { x: 0, y: 1, width: 2, height: 3 };

//  0 1 2
// +-+-+-+
// |F| | | 0
// +-+-+-+
// |T|a| | 1
// +-+-+-+
// |a|a| | 2
// +-+-+-+
// |a|a| | 3
// +-+-+-+
console.log(areBoxesOverlapping(a, { x: 0, y: 1, width: 1, height: 1 }));  // -> true
console.log(areBoxesOverlapping(a, { x: 0, y: 0, width: 1, height: 1 }));  // -> false

//  0 1 2
// +-+-+-+
// | | | | 0
// +-+-+-+
// |a|a| | 1
// +-+-+-+
// |a|a| | 2
// +-+-+-+
// |T|a| | 3
// +-+-+-+
// |F| | | 4
// +-+-+-+
console.log(areBoxesOverlapping(a, { x: 0, y: 3, width: 1, height: 1 }));  // -> true
console.log(areBoxesOverlapping(a, { x: 0, y: 4, width: 1, height: 1 }));  // -> false

//  1 0 1 2
// +-+-+-+-+
// | | | | | 0
// +-+-+-+-+
// |F|T|a| | 1
// +-+-+-+-+
// | |a|a| | 2
// +-+-+-+-+
// | |a|a| | 3
// +-+-+-+-+
console.log(areBoxesOverlapping(a, { x: 0, y: 1, width: 1, height: 1 }));  // -> true
console.log(areBoxesOverlapping(a, { x: -1, y: 0, width: 1, height: 1 }));  // -> false

//  0 1 2
// +-+-+-+
// | | | | 0
// +-+-+-+
// |a|T|F| 1
// +-+-+-+
// |a|a| | 2
// +-+-+-+
// |a|a| | 3
// +-+-+-+
console.log(areBoxesOverlapping(a, { x: 1, y: 1, width: 1, height: 1 }));  // -> true
console.log(areBoxesOverlapping(a, { x: 2, y: 0, width: 1, height: 1 }));  // -> false
```


## Use cases
- Use for results got in [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
