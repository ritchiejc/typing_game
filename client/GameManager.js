function GameManager() {

	enum GameState
	this.tileEngine = null;
	this.groupManager = null;
	
	this.init = function(gameWidth, gameHeight) {
		
		this.tileEngine = new TileEngine();
		
		this.groupManager = new GroupManager();
		this.groupManager.init(gameWidth, gameHeight);
	
	};
	
	this.update = function() {
	
	};
}