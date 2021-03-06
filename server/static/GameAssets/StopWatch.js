var StopWatch = function() {
	var start;
	var clock;
	
	this.begin = function()
	{
		this.start = Date.now();
		this.clock = 0;
	}
	
	this.display = function()
	{	
		this.clock += this.change();
		return this.clock/1000;
	}

	this.change = function()
	{
		var now = Date.now();
		var delta = now - this.start;

		this.start = now;
		return delta;
	}
};
