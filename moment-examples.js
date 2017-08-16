var moment = require('moment');
var now = moment();

// https://momentjs.com/docs/#/displaying/format/
console.log(now.format('MMM Do YYYY, h:mma')); // Aug 16th 2017, 10:12am

// https://momentjs.com/docs/#/displaying/unix-timestamp-milliseconds/
console.log(now.valueOf());
console.log(now.format('X'));

var timestamp = 1502853091;
var timestampMoment = now.utc(timestamp);

console.log(timestampMoment.format('MMM Do YYYY, h:mma'));
