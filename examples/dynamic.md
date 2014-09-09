# Dynamic

---

## Dynamic Line chart


````html
<div id="c1"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
        var chart = new AChart({
          id : 'c1',
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,50]
            
          },
          title : {
            text : '动态折线'
          },
          xAxis : {
            type : 'time',
            tickInterval : 1000,
            formatter : function(value){
              var date = new Date(value);
              return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            },
            tickOffset : 10,
	        labels : {
              label : {
                rotate : -45,
                'text-anchor' : 'end'
              }
            }
          },
          yAxis : {
            title : {
              text : 'xxxxx'
            },
            min : 0
          },  
          tooltip : {
            valueSuffix : '°C'
          },
          legend : {
            align : 'right',
            layout : 'vertical',
            dy : -150,
            dx : -60
          },
          series : [ {
              name: 'New York',
              smooth : true,
              pointInterval : 2000,
              //type : 'column',
              data: (function() {                                                 
                  // generate an array of random data                             
                  var data = [],                                                  
                      time = Math.floor((new Date()).getTime()/1000) * 1000,                              
                      i;                                                          
                                                                                  
                  for (i = -19; i <= 0; i++) {                                    
                      data.push({                                                 
                          x: time + i * 1000,                                     
                          y: Math.random() + .25                                      
                      });                                                         
                  }                                                               
                  return data;                                                    
              })() 
          }]
        });
 
        chart.render();
 
          var series = chart.getSeries()[0]; 
 
                                   
          setInterval(function() {                                    
              add(); 
                                  
          }, 1000);
 
 
          function add(){
            var x = Math.floor((new Date()).getTime()/1000) * 1000, // current time         
                  y = Math.random() + 0.25;  
              
            series.addPoint([x, y],true,true); 
          }
});
````

## Dynamic Bar chart


````html
<div id="c2"></div>
````

````javascript
seajs.use('acharts', function(Achart) {
         var chart = new AChart({
          id : 'c2',
          width : 950,
          height : 500,
          plotCfg : {
            margin : [50,50,50]
            
          },
          title : {
            text : '动态柱状图'
          },
          xAxis : {
            type : 'time',
            tickInterval : 1000,
            formatter : function(value){
              var date = new Date(value);
              return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            },
            tickOffset : 10,
            labels : {
              label : {
                rotate : -45,
                'text-anchor' : 'end'
              }
            }
          },
          yAxis : {
            title : {
              text : 'xxxxx'
            },
            min : 0
          },  
          tooltip : {
            valueSuffix : '°C'
          },
          legend : {
            align : 'right',
            layout : 'vertical',
            dy : -150,
            dx : -60
          },
          series : [ {
              name: 'New York',
              pointInterval : 2000,
              type : 'column',
              data: (function() {                                                 
                  // generate an array of random data                             
                  var data = [],                                                  
                      time = Math.floor((new Date()).getTime()/1000) * 1000,                              
                      i;                                                          
                                                                                  
                  for (i = -19; i <= 0; i++) {                                    
                      data.push({                                                 
                          x: time + i * 1000,                                     
                          y: Math.random() + .25                                      
                      });                                                         
                  }                                                               
                  return data;                                                    
              })() 
          }]
        });
 
        chart.render();
 
          var series = chart.getSeries()[0]; 
 
                                   
          setInterval(function() {                                    
              add(); 
                                  
          }, 1000);
 
 
          function add(){
            var x = Math.floor((new Date()).getTime()/1000) * 1000, // current time         
                  y = Math.random() + 0.25;  
              
            series.addPoint([x, y],true,true); 
          }
});
````




