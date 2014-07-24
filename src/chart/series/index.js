/**
 * @fileOverview 数据序列的入口文件
 * @ignore
 */


var Series = require('./base');

Series.Line = require('./line');
Series.Area = require('./area');
Series.Column = require('./column');
Series.Scatter = require('./scatter');
Series.Bubble = require('./bubble');
Series.Pie = require('./pie');

return Series;
