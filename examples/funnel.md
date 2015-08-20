# Funnel

---
## Funnel chart

````html
<div id="c1"></div>
````




````javascript
seajs.use('acharts', function(Achart) {
   var chart = new AChart({
        id : 'c1',
        width : 600,
        height : 500,
        plotCfg : {
            margin : 50
        },
        tooltip : {
        },
        legend : null,
        series : [
            {
                name : '流量分析',
                type : 'funnel',
                animate: false,
                colors : ['#00a3d7','#6ebb46','#f6c100','#ff6a00','#e32400','#423ba8'],
                labels : {
                    position : 'right',//middle,left,right
                    offset : 30,
                    label : {
                        'font-size' : '16px',
                        fill : 'black'
                    }
                },
                legend : {
                  x : -22,
                  y : -15,
                  leaveChecked : true, //阻止最后一项也取消勾选
                },
                data : [
                  {value:40, name:'咨询'},
                  {value:20, name:'订单'},
                  {value:60, name:'点击'},
                  {value:80, name:'点击'},
                  {value:100, name:'展现'}
                ],
                sort : 'asc'
            }
        ]
    });

    chart.render();
});
````
