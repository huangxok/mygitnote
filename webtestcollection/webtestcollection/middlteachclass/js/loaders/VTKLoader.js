/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.VTKLoader = function () {    //���������ʾʽ

    THREE.EventDispatcher.call(this);  //�̳м����� ʹ������м����Ĺ��� ���ü������ķ��� 

};

THREE.VTKLoader.prototype = {      //ԭ�Ͷ���

    constructor: THREE.VTKLoader,  //���캯��

    load: function (url, callback) {  //load����

        var scope = this;               //������ ��ֵΪ�ֲ�����
        var request = new XMLHttpRequest();   //ajax����
        //������ɵļ�������������ɺ󣬽����õڶ�������Ļص�����
        request.addEventListener('load', function (event) {
            //event.target.responseText  �Ƿ��������ص��ı����ݣ������ļ�
            //�е��������ݣ�ͨ��scope.parse��������ת��Ϊgeometry����ת�����
            //����ͨ��dispathevent��������һ��������ɵ���Ϣ����Ϣ�з���geometry
            //�����塣����������ǿ��Ժ�mesh���壬������ʾ�ڳ����У�������callback
            //��Ϊnull����ô���ǵ��ûص�����
            var geometry = scope.parse(event.target.responseText); //����ģ��

            scope.dispatchEvent({ type: 'load', content: geometry });  //

            if (callback) callback(geometry);

        }, false);
        //���ؽ�����Ϣ:�����Ѿ����ص������ֽ������ļ��ܹ���ֱ���� ͨ��2�߰ٷֱ��˽���ؽ���
        request.addEventListener('progress', function (event) {

            scope.dispatchEvent({ type: 'progress', loaded: event.loaded, total: event.total });

        }, false);
        //���س���ļ���
        request.addEventListener('error', function () {

            scope.dispatchEvent({ type: 'error', message: 'Couldn\'t load URL [' + url + ']' });

        }, false);
        //��ʼ��http������� ����url http���� ������������
        request.open('GET', url, true);
        //����http����
        request.send(null);

    },
    //------------------�������ص����ݣ���ת��Ϊgeometry���� dataΪvtk�ļ��е��ı�����------------------//
    parse: function (data) {

        var geometry = new THREE.Geometry();
        //��x��y��z���ɵ�һ�����㣬������geometry��vertices������
        function vertex(x, y, z) {

            geometry.vertices.push(new THREE.Vector3(x, y, z));

        }
        //�����3�������������geometry��faces������
        function face3(a, b, c) {

            geometry.faces.push(new THREE.Face3(a, b, c));

        }
        //�������4������ ����һ��faces4����faces  ��ΪN���� ����
        function face4(a, b, c, d) {

            geometry.faces.push(new THREE.Face4(a, b, c, d));

        }
        //pattern ����ʽ  result ��ʱ����

        var pattern, result;

        //3 float float float
        //ƥ��3���ո������float �磺-0.0378279 0.12794 0.00447467
        pattern = /([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)/g;
        //exceִ��ƥ�䣬result����һ��3���ַ��������飬���data�����������ôresult������null�����ģʽ������ƥ��POINTS 35947 float���ݵ�
        while ((result = pattern.exec(data)) != null) {

            // ["1.0 2.0 3.0", "1.0", "2.0", "3.0"]
            //���ַ���ת��Ϊfloat��������geometry��
            vertex(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));

        }

        // 3 int int int
        //ƥ��������� ��3 21216 21215 20399
        pattern = /3[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;

        while ((result = pattern.exec(data)) != null) {

            // ["3 1 2 3", "1", "2", "3"]
            //�������ݷ���geometry��faces��
            face3(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]));

        }

        // 4 int int int int
        //4����������
        pattern = /4[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;

        while ((result = pattern.exec(data)) != null) {

            // ["4 1 2 3 4", "1", "2", "3", "4"]

            face4(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));

        }
        //���ϴ������vtk�ļ��е�ÿһ��  ���ĳһ���ǵ� ����geometry��vertices�� ������� ����geometry��faces��
        //--------------------------------------------����ƥ�����---------------------------------------------------//

        //-----------------------------------------threejs���溯��---------------------------------------------------//
        //�����������ÿ������������� ������ƽ�滹�ǿռ�����ϵ�У����Ŀ����������ƽ��ֵ���õ���
        //���ĺ�����x:��X1+X2+X3��/3
        //���ĺ�����y:��Y1+Y2+Y3��/3
        //���ĺ�����z:��Z1+Z2+Z3��/3
        //computeCentroids�����ڲ�������������ģ����ļ�����ˣ����洢��face.centroid��������С�
        geometry.computeCentroids();
        //���������������ÿһ�����һ����ķ������������ķ������������face.normal��
        geometry.computeFaceNormals();
        //���������������ÿһ������ķ�����
        geometry.computeVertexNormals();
        //�����������һ�����԰�Χgeometry��һ����Բ�����ĵ����geometry�����ģ�sphere�����뾶�������ĵ���Զ����һ����
        geometry.computeBoundingSphere();

        return geometry;
        //-----����4�������ļ���������three.js�����У����õ������ԣ��Լ�д����ģ�͵Ľ�����ʱ����õ������⼸������-------//
    }

}
