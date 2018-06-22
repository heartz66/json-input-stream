[![npm version](https://img.shields.io/npm/v/json-input-stream.svg)](https://npmjs.com/package/json-input-stream)
[![npm downloads](https://img.shields.io/npm/dm/json-input-stream.svg)](https://npmjs.com/package/json-input-stream)
[![dependencies Status](https://david-dm.org/Heartz66/json-input-stream/status.svg)](https://david-dm.org/Heartz66/json-input-stream)
[![license:mit](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

# json-input-stream
`json-input-stream` transforms the incoming data inside a JSON object.

I made this because I always use JSON objects as response from my API, and using `fs.createReadStream` with a pipeline to the response would send the inside of the file, without the pretty looking JSON response. This way I still have the JSON responses, and don't run out of memory if using `fs.readFileSync` on huge files and creating the JSON response with the returned data from `fs.readFileSync`.

# Documentation
### Constructor([data])
- `data` - The object you want the incoming data to be transformed into. This object must contain the `JsonInputStream.OUTPUT_LOCATION` variable, this is where the data is going to be located.

Constructs a new instance of json-input-stream.

**Example:**

```js
let JsonInputStream = require('json-input-stream');
let fs = require('fs');

fs.createReadStream('./content-file.txt', 'utf8')
    .pipe(JsonInputStream({
        success: true,
        result: {
            content: JsonInputStream.OUTPUT_LOCATION
        }
    }))
    .pipe(fs.createWriteStream('./json-file.json'));
