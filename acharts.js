var acharts = require('./src/chart');

acharts.Util = require('achart-util');
acharts.Canvas = require('achart-canvas');
acharts.Plot = require('achart-plot');
acharts.Actived = require('achart-actived');

acharts.Date = require('achart-date');
acharts.Theme = require('achart-theme');

acharts.Series = require('achart-series');
acharts.Axis = require('achart-axis');
acharts.Tooltip = require('achart-tooltip');

require('achart-series-other');

window.Chart = acharts;
window.AChart = acharts;

module.exports = acharts;
