/**
 * Created with JetBrains WebStorm.
 * User: gery
 * Date: 13-7-5
 * Time: 下午11:38
 * To change this template use File | Settings | File Templates.
 */
myStats = function()
{
    Sim.Object.call(this);
}

myStats.prototype = new Sim.Object();

myStats.prototype.init = function()
{
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('container').appendChild(stats.domElement);
    this.stats = stats;
}

myStats.prototype.update = function()
{
    this.stats.update();
}