function mix(obj1,obj2){

}

var chart = [
  {
    text: 'width',
    dataType: 'number',
    desc: '指定图表的宽度'
  },
  {
	text: 'height',
    dataType: 'number',
    desc: '指定图表的高度'
  },
  {
	text: 'legend',
	dataType: 'object',
    desc: '用图标展示各个序列',
    children: [
      {
  	    text: 'spacingX',
	    dataType: 'number',
	    def: 5,
	    desc: '排布时子项之间x间距'
      }
    ]
  }
]

module.exports = chart;