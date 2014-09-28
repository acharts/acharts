# 使用方式

---

如何使用acharts

---

## 目录

  * 直接引用
  * 使用[spm](http://spmjs.io/)
  * 打包自己的acharts文件

### 直接使用acharts

  * 可以下载acharts到本地
    * [最新版本](https://github.com/acharts/acharts/archive/master.zip)
    * [历史版本](https://github.com/acharts/acharts/releases)
  * 直接引入cdn上的地址

    * 例如 ：http://g.alicdn.com/bui/acharts/1.0.9/acharts-min.js 其中1.0.9是版本号，可以替换成对应的版本

    ```html
      <script src="http://g.alicdn.com/bui/acharts/1.0.9/acharts-min.js"></script> 
      <script src="http://g.tbcdn.cn/bui/acharts/1.0.9/acharts-min.js"></script> 

      <!- https -->
      <script src="https://g.alicdn.com/bui/acharts/1.0.9/acharts-min.js"></script> 
      <script src="https://s.tbcdn.cn/g/bui/acharts/1.0.9/acharts-min.js"></script>

    ```
### 使用[spm](http://spmjs.io/)

  * acharts所有的模块都是由spm管理的,[spm文档](http://spmjs.io/documentation),使用spm的步骤
  
    1. 安装 spm 
      ```
      $ npm install spm -g

      ```
    2. 安装acharts模块

      ```
        mkdir example
        $ cd example
        $ spm init

        $ spm install acharts --save

      ```
    3. 使用acharts,在js文件中直接： 

      ```js

      var AChart = require('acharts');

      var chart = new AChart({

      });

      ```
    4. 打包

      ```
      $ spm build

      //把图表也打包进去
      $ spm build --include all

      ```

### 打包自己的acharts文件

  1. 从github clone 项目

    ```
      git clone https://github.com/acharts/acharts.git

    ```

  2. 安装 spm 

    ```
      $ npm install spm -g

    ```

  3. 安装acharts依赖的模块

    ```

    $ spm install -f 

    ```

  4. 添加或者删除依赖的模块

    * package.json 中增加或者删除依赖的模块

    ```js
    "dependencies": {
      "achart-util": "1.0.0",
      "achart-canvas": "1.0.0",
      "achart-legend": "1.0.0",
      "achart-axis": "1.0.0",
      "achart-series": "1.0.0",
      "achart-series-other": "1.0.0",
      "achart-tooltip": "1.0.1",
      "achart-actived": "1.0.0",
      "achart-plot": "1.0.0",
      "achart-theme": "1.0.0",
      "achart-date": "1.0.0",
      "expect": "0.3.1",
      "expect.js": "0.3.1",
      "sinon": "1.6.0",
      "event-simulate": "1.0.0"
    },

    ```
    * acharts.js 中增加或者删除 对应模块的require

    ```js

    var acharts = require('./src/chart');

    acharts.Util = require('achart-util');
    acharts.Canvas = require('achart-canvas');

    acharts.Date = require('achart-date');
    acharts.Theme = require('achart-theme');

    acharts.Series = require('achart-series');
    acharts.Axis = require('achart-axis');

    require('achart-series-other');

    ```
    去掉 require('achart-series-other'); 后，散点图、气泡图、标记图都不会打包了

  5. 打包,在dist目录下会生成相应版本的文件

    ```
      $ spm build

    ```






