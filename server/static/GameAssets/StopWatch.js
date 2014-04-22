var StopWatch = function() {
	var start_time;
	
	
	this.begin = function()
	{
		this.start_time = Date.now();
	}
	
	this.display = function()
	{
		var current = Date(this.start_time);
		var result = "";
		result += current.getMinutes();
		result += ": ";
		result += current.getSeconds();
		result += ": ";
		result += current.getMilliseconds();
		return result;
	}
};