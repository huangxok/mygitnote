/**
 * Created with JetBrains WebStorm.
 * User: gery
 * Date: 13-7-6
 * Time: 下午5:31
 * To change this template use File | Settings | File Templates.
 */

myItems = function()
{
    Sim.Object.call(this);
    this.itemsmeshes = [];
    this.itemgeometries = [];
    this.itemsc = undefined;
    this.itemsMaterial = undefined;
    this.tileUvWidth = 1;
    this.tileUvHeight = 1;

}

myItems.prototype = new Sim.Object();

myItems.prototype.init = function(win)
{
    // 存放所有的漂浮体
    var group = new THREE.Object3D();
    this.setObject3D(group);
    var that = this;

    var itemscanvas = win.document.createElement('canvas');
    itemscanvas.width = 256;
    itemscanvas.height = 256;
    this.itemsc = itemscanvas.getContext('2d');
    this.itemsMaterial = this.getMaterial(itemscanvas, true);

    var items = new Image();
    items.onload = function () {
        that.itemsc.clearRect(0, 0, itemscanvas.width, itemscanvas.height);
        that.itemsc.drawImage(items, 0, 0);
        // 创建漂浮物
        var l = 16*16;
        for(var i=0; i < l; i++) {
            for(var j=0; j < 4; j++) {
                var item = that.createItem(i);
                item.position.x = Math.random()*400-200;
                item.position.y = Math.random()*400-200;
                item.position.z = Math.random()*400-200;
                that.object3D.add(item);
                that.itemsmeshes.push(item);
            }
        }
    };

    items.src = "img/items.png";
}

myItems.prototype.update = function()
{

}

myItems.prototype.createItem = function(id) {
    function getSides (x, y) {
        var ix = Math.floor(id % 16)*16;
        var iy = Math.floor(id / 16)*16;

        var px = (x+1) < 16? imd[((x+1)+y*16)*4+3] : 0;
        var nx = (x-1) >= 0? imd[((x-1)+y*16)*4+3] : 0;
        var py = (y+1) < 16? imd[(x+(y-1)*16)*4+3] : 0;
        var ny = (y-1) >= 0? imd[(x+(y+1)*16)*4+3] : 0;

        return {
            px: !px, // Turns zero and undefined to true
            nx: !nx,
            py: !py,
            ny: !ny,
            pz: true,
            nz: true
        };
    };

    if(this.itemgeometries[id] === undefined) {
        var imgdata = this.itemsc.getImageData(Math.floor(id % 16)*16, Math.floor(id / 16)*16, 16, 16);
        var imd = imgdata.data; // 图形像素数组，每个像素占4个字节

        this.tileUvWidth = 1/256;
        this.tileUvHeight = 1/256;

        var geo = new THREE.Geometry();

        var isAllEmpty = true;

        // 每个漂浮物由16宽和16高的单元格组成。每个单元格由一个像素的填充。
        for(var x=0; x < 16; x++) {
            for(var y=0; y < 16; y++) {
                if(imd[(x+y*16)*4+3] === 0) {
                    continue;
                }
                isAllEmpty = false;

                var voxel = new THREE.CubeGeometry(1, 1, 1, 1, 1 , 1, undefined, getSides(x, y));

                for(var i=0; i < 6; i++) { // Fix color of voxel
                    if(voxel.faceVertexUvs[0][i]) {
                        this.uvmap(voxel, i, Math.floor(id % 16)*16+x, Math.floor(id / 16)*16+y, 1, 1);
                    }
                }
                for(var i=0; i < 8; i++) { // Fix voxel's position
                    if(voxel.vertices[i]) {
                        voxel.vertices[i].x += x-7.5;
                        voxel.vertices[i].y += -(y-7.5);
                    }
                }

                THREE.GeometryUtils.merge(geo, voxel);
            }
        }
        if(!false) {
            var sides = new THREE.CubeGeometry(16, 16, 1, 1, 1, 1, undefined, { px: false, nx: false, py: false, ny: false });
            this.uvmap(sides, 0, Math.floor(id % 16)*16, Math.floor(id / 16)*16, 16, 16);
            this.uvmap(sides, 1, Math.floor(id % 16)*16+16, Math.floor(id / 16)*16, -16, 16);
            THREE.GeometryUtils.merge(geo, sides);
        }


        this.itemgeometries[id] = geo;
    }
    else {
        var geo = this.itemgeometries[id];
    }

    var mesh = new THREE.Mesh( geo, this.itemsMaterial );

    return mesh;
};


myItems.prototype.uvmap = function(geometry, face, x, y, w, h, rotateBy) {
    if(!rotateBy) rotateBy = 0;
    var uvs = geometry.faceVertexUvs[0][face];
    var tileU = x;
    var tileV = y;

    uvs[ (0 + rotateBy) % 4 ].u = tileU * this.tileUvWidth;
    uvs[ (0 + rotateBy) % 4 ].v = tileV * this.tileUvHeight;
    uvs[ (1 + rotateBy) % 4 ].u = tileU * this.tileUvWidth;
    uvs[ (1 + rotateBy) % 4 ].v = tileV * this.tileUvHeight + h * this.tileUvHeight;
    uvs[ (2 + rotateBy) % 4 ].u = tileU * this.tileUvWidth + w * this.tileUvWidth;
    uvs[ (2 + rotateBy) % 4 ].v = tileV * this.tileUvHeight + h * this.tileUvHeight;
    uvs[ (3 + rotateBy) % 4 ].u = tileU * this.tileUvWidth + w * this.tileUvWidth;
    uvs[ (3 + rotateBy) % 4 ].v = tileV * this.tileUvHeight;
};

myItems.prototype.getMaterial = function(img, trans) {
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.Texture(
            img,
            new THREE.UVMapping(),
            THREE.ClampToEdgeWrapping,
            THREE.ClampToEdgeWrapping,
            THREE.NearestFilter,
            THREE.NearestFilter,
            (trans? THREE.RGBAFormat : THREE.RGBFormat)
        ),
        transparent: trans
    });
    material.map.needsUpdate = true;
    return material;
};