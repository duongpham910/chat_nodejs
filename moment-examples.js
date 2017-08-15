var moment = require('moment');
var now = moment();

console.log(now.format('X'));

var timestamp = 1502816182;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.format('h:mm a'));

console.log(now.format('MMM Do YYYY, h:mma')); // Detail: https://momentjs.com/docs/#/displaying/
