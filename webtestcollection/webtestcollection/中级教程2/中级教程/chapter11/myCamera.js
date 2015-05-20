/**
 * Created with JetBrains WebStorm.
 * User: gery
 * Date: 13-7-6
 * Time: 上午10:10
 * To change this template use File | Settings | File Templates.
 */
myCamera = function(camera)
{
    Sim.Object.call(this);
    var startTime=0;
    this.startTime = startTime;
    this.camera = camera;
}

myCamera.prototype = new Sim.Object();

myCamera.prototype.init = function()
{
}

myCamera.prototype.update = function()
{
    var time = (Date.now() - this.startTime)/1000;
    this.camera.position.x = 100*Math.cos(time/2);
    this.camera.position.z = 100*Math.sin(time/2);
}