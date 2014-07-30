var acharts = require('./src/chart');


acharts.Util = require('./src/util');
acharts.Canvas = require('./src/canvas');

acharts.Date = require('./src/date');

window.Chart = acharts;
module.exports = acharts;
