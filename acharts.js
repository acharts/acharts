var acharts = require('./src/chart');


acharts.Util = require('./src/util');
acharts.Canvas = require('./src/canvas');

acharts.Date = require('./src/date');
acharts.Theme = require('./src/chart/theme');

window.Chart = acharts;
window.AChart = acharts;

module.exports = acharts;
