var acharts = require('./src/chart');

acharts.Util = require('achart-util');
acharts.Canvas = require('achart-canvas');

acharts.Date = require('achart-date');
acharts.Theme = require('achart-theme');

acharts.Series = require('achart-series');
acharts.Axis = require('achart-axis');

require('achart-series-other');

window.Chart = acharts;
window.AChart = acharts;

module.exports = acharts;
