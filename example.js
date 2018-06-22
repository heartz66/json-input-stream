let fs = require('fs');
let JsonInputStream = require('./index');

fs.createReadStream('./content-file.txt', 'utf8')
    .pipe(JsonInputStream({
        success: true,
        result: {
            content: JsonInputStream.OUTPUT_LOCATION
        }
    }))
    .pipe(fs.createWriteStream('./json-file.json'));