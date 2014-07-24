/**
 * @fileOverview 坐标轴的入口文件
 * @ignore
 */


var
	Axis = require('./base');

Axis.Category = require('./category');

Axis.Number = require('./number');

Axis.Time = require('./time');

Axis.Auto = require('./auto');

Axis.Circle = require('./circle');

Axis.Radius = require('./radius');

return Axis;
