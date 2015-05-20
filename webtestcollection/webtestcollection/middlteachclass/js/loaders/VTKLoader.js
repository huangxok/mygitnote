/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.VTKLoader = function () {    //函数定义表示式

    THREE.EventDispatcher.call(this);  //继承监听器 使这个类有监听的功能 调用监听器的方法 

};

THREE.VTKLoader.prototype = {      //原型对象

    constructor: THREE.VTKLoader,  //构造函数

    load: function (url, callback) {  //load方法

        var scope = this;               //对象本身 赋值为局部变量
        var request = new XMLHttpRequest();   //ajax请求
        //加载完成的监听器，加载完成后，将调用第二个定义的回调函数
        request.addEventListener('load', function (event) {
            //event.target.responseText  是服务器返回的文本数据，就是文件
            //中的所有数据，通过scope.parse方法将其转化为geometry对象。转换完后，
            //将会通过dispathevent向自身发送一个加载完成的消息，消息中返回geometry
            //几何体。这个几何体是可以和mesh合体，最终显示在场景中，最后如果callback
            //不为null，那么我们调用回调函数
            var geometry = scope.parse(event.target.responseText); //解析模型

            scope.dispatchEvent({ type: 'load', content: geometry });  //

            if (callback) callback(geometry);

        }, false);
        //加载进度信息:包含已经加载的数据字节数和文件总共的直接输 通过2者百分比了解加载进度
        request.addEventListener('progress', function (event) {

            scope.dispatchEvent({ type: 'progress', loaded: event.loaded, total: event.total });

        }, false);
        //加载出错的监听
        request.addEventListener('error', function () {

            scope.dispatchEvent({ type: 'error', message: 'Couldn\'t load URL [' + url + ']' });

        }, false);
        //初始化http请求参数 例如url http方法 但不发送请求
        request.open('GET', url, true);
        //发送http请求
        request.send(null);

    },
    //------------------解析加载的数据，并转化为geometry对象 data为vtk文件中的文本数据------------------//
    parse: function (data) {

        var geometry = new THREE.Geometry();
        //将x，y，z生成的一个顶点，并放入geometry的vertices数组中
        function vertex(x, y, z) {

            geometry.vertices.push(new THREE.Vector3(x, y, z));

        }
        //将面的3个点的索引放入geometry的faces数组中
        function face3(a, b, c) {

            geometry.faces.push(new THREE.Face3(a, b, c));

        }
        //如果面试4个顶点 构造一个faces4放入faces  若为N个点 类推
        function face4(a, b, c, d) {

            geometry.faces.push(new THREE.Face4(a, b, c, d));

        }
        //pattern 正则式  result 临时变量

        var pattern, result;

        //3 float float float
        //匹配3个空格隔开的float 如：-0.0378279 0.12794 0.00447467
        pattern = /([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)/g;
        //exce执行匹配，result返回一个3个字符串的数组，如果data读到了最后，那么result将返回null，这个模式是用来匹配POINTS 35947 float数据的
        while ((result = pattern.exec(data)) != null) {

            // ["1.0 2.0 3.0", "1.0", "2.0", "3.0"]
            //将字符串转换为float，并放入geometry中
            vertex(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));

        }

        // 3 int int int
        //匹配面的数据 如3 21216 21215 20399
        pattern = /3[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;

        while ((result = pattern.exec(data)) != null) {

            // ["3 1 2 3", "1", "2", "3"]
            //将面数据放入geometry的faces中
            face3(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]));

        }

        // 4 int int int int
        //4个顶点的情况
        pattern = /4[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;

        while ((result = pattern.exec(data)) != null) {

            // ["4 1 2 3 4", "1", "2", "3", "4"]

            face4(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));

        }
        //以上代码遍历vtk文件中的每一行  如果某一行是点 放入geometry的vertices中 如果是面 放入geometry的faces中
        //--------------------------------------------解析匹配完成---------------------------------------------------//

        //-----------------------------------------threejs引擎函数---------------------------------------------------//
        //这个函数是算每个面的重心坐标 无论是平面还是空间坐标系中，重心可以求坐标的平均值来得到如
        //重心横坐标x:（X1+X2+X3）/3
        //重心横坐标y:（Y1+Y2+Y3）/3
        //重心横坐标z:（Z1+Z2+Z3）/3
        //computeCentroids函数内部就是这样处理的，重心计算出了，被存储在face.centroid这个变量中。
        geometry.computeCentroids();
        //这个函数用来计算每一个面归一化后的法向量，计算后的法向量被存放在face.normal中
        geometry.computeFaceNormals();
        //这个函数用来计算每一个顶点的法向量
        geometry.computeVertexNormals();
        //这个函数计算一个可以包围geometry的一个椭圆，中心点就是geometry的中心，sphere的最大半径是离中心点最远的那一个点
        geometry.computeBoundingSphere();

        return geometry;
        //-----以上4个函数的计算结果，在three.js引擎中，会用到，所以，自己写加载模型的解析器时，最好调用在这几个函数-------//
    }

}
