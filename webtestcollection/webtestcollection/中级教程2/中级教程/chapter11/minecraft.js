// Constructor
MineCraftApp = function()
{
	Sim.App.call(this);
}

// Subclass Sim.App
MineCraftApp.prototype = new Sim.App();

// Our custom initializer
MineCraftApp.prototype.init = function(param)
{
	// Call superclass init code to set up scene, renderer, default camera
	Sim.App.prototype.init.call(this, param);
	
    // Create the Earth and add it to our sim
    var myStats1 = new myStats();
    myStats1.init();
    this.addObject(myStats1);

    var skyBox1 = new skyBox();
    skyBox1.init();
    this.addObject(skyBox1);

    var myCamera1 = new myCamera(this.camera);
    myCamera1.init();
    this.addObject(myCamera1);

    var myItems1 = new myItems();
    myItems1.init(window);
    this.addObject(myItems1);


}
