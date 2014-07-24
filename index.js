var acharts = require('./src/chart');


acharts.Util = require('./src/util');
acharts.Canvas = require('./src/canvas');

window.Chart = acharts;
module.exports = acharts;
