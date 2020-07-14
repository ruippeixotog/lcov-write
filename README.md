# lcov-write

Writes coverage information in a JSON format to an LCOV file. The inputs accepted are based on, and
intended to be compatible with, https://github.com/davglass/lcov-parse and
https://github.com/vokal/cobertura-parse.

## Use

```js
const lcovWrite = require("lcov-write");

// write to a file
lcovWrite.write(coverageJson, "filepath.xml", (err, result) => { ... });

// or write to a string
const lcovStr = lcovWrite.stringify(coverageJson);
```

## Copyright

Copyright (c) 2020 Rui Gonçalves. See LICENSE for details.
