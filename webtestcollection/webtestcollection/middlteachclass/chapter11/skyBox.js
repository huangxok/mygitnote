/**
 * Created with JetBrains WebStorm.
 * User: gery
 * Date: 13-7-5
 * Time: 下午11:53
 * To change this template use File | Settings | File Templates.
 */
skyBox = function()
{
    Sim.Object.call(this);
}

skyBox.prototype = new Sim.Object();

skyBox.prototype.init = function()
{
    var urls = [
        "img/panorama3.png",
        "img/panorama1.png",
        "img/panorama4.png",
        "img/panorama5.png",
        "img/panorama2.png",
        "img/panorama0.png"
    ];
    var textureCube = THREE.ImageUtils.loadTextureCube( urls );

    // init the cube shadder
    var shader  = THREE.ShaderUtils.lib["cube"];
    var uniforms    = THREE.UniformsUtils.clone( shader.uniforms );
    uniforms['tCube'].texture = textureCube;
    var material = new THREE.ShaderMaterial({
        fragmentShader	: shader.fragmentShader,
        vertexShader	: shader.vertexShader,
        uniforms		: uniforms
    });

    // build the skybox Mesh
    var skyboxMesh  = new THREE.Mesh( new THREE.CubeGeometry( 500, 500, 500, 1, 1, 1, null, true ), material );
    skyboxMesh.doubleSided = true;
    this.setObject3D(skyboxMesh);


}

skyBox.prototype.update = function()
{

}