let uuid = require('uuid');
let stream = require('stream');
let util = require('util');

let OUTPUT_LOCATION = uuid.v4();
let SPLIT_LOCATION = '"' + OUTPUT_LOCATION + '"';

function JsonInputStream(data) {
    stream.Transform.call(this, {objectMode: true});

    if (typeof data !== 'object') {
        throw new Error('Invalid JSON object given.');
    }

    let stringObject = JSON.stringify(data);

    if (stringObject.indexOf(SPLIT_LOCATION) === -1) {
        throw new Error('No output location has been found in given object.');
    }

    this.objectParts = stringObject.split(SPLIT_LOCATION);

    this.push(this.objectParts[0]);
}

util.inherits(JsonInputStream, stream.Transform);

JsonInputStream.prototype._transform = function (row, enc, callback) {
    this.push(JSON.stringify(row, null));

    callback();
};

JsonInputStream.prototype._flush = function (callback) {
    this.push(this.objectParts[1]);

    this.objectParts = null;

    callback();
};

module.exports = function (object) {
    return new JsonInputStream(object);
};

module.exports.OUTPUT_LOCATION = OUTPUT_LOCATION;