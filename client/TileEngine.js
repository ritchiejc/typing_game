function TileEngine() {
	
	this.map = null;
	this.player = null;
	
	//Clears and draws a new map if the map exists
	//Only call this function once per map
	this.drawMap = function() {
		
		if(this.map != null) {
			this.map.clear();
			this.map.draw();
		}
	};
	
	this.drawPlayer = function() {
		this.clearPlayer();
	};
	
	this.clearPlayer = function() {
	
	};
	
	this.drawMapItems = function() {
		this.clearMapItems();
	};
	
	this.clearMapItems = function() {
	
	}
	
	this.canMoveUp = function() {
		return (this.player != null && //player exists
					this.map != null && //map exists
					this.player.posX >= 0 && this.player.posX < this.map.width && // player posX in map
					this.player.posY + 1 >= 0 && this.player.posY + 1 < this.map.height && // player posY + 1 in map
					this.map.mask[player.posX][player.posY + 1] != 2); // 2 is the collidable gID for the mask 
	};
	
	this.canMoveDown = function() {
		return (this.player != null && //player exists
					this.map != null && //map exists
					this.player.posX >= 0 && this.player.posX < this.map.width && // player posX in map
					this.player.posY - 1 >= 0 && this.player.posY - 1 < this.map.height && // player posY + 1 in map
					this.map.mask[player.posX][player.posY - 1] != 2); // 2 is the collidable gID for the mask 	
	};
	
	this.canMoveLeft = function() {
		return (this.player != null && //player exists
					this.map != null && //map exists
					this.player.posX - 1>= 0 && this.player.posX - 1< this.map.width && // player posX in map
					this.player.posY >= 0 && this.player.posY < this.map.height && // player posY + 1 in map
					this.map.mask[player.posX - 1][player.posY] != 2); // 2 is the collidable gID for the mask 
	};
	
	this.canMoveRight = function() {
		return (this.player != null && //player exists
					this.map != null && //map exists
					this.player.posX + 1 >= 0 && this.player.posX + 1< this.map.width && // player posX in map
					this.player.posY >= 0 && this.player.posY < this.map.height && // player posY + 1 in map
					this.map.mask[player.posX + 1][player.posY] != 2); // 2 is the collidable gID for the mask 
	};
	
	this.setMovePrompts = function() {
	
	};
	
	this.clearMovePrompts = function() {
	
	};
	

}
