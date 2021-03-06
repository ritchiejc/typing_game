function TileMap() {
	
	//Dimensions of the map in tiles
	this.width = 0;
	this.height = 0;
	
	//Dimension of the tiles in pixels
	this.tileWidth = 0;
	this.tileHeight = 0;
	
	//mask will be initiated as 2d arrays 
	//that store info about the tiles and mask
	this.mask = null;
	
	this.tilesets = null;
	this.backgroundLayers = null;
	this.foreGroundLayers = null;
	
	/*The map is drawn through #mapgroup
		#mapgroup has:
			#mapbackground
			#maptiles
			#mapobjects
	*/
	this.draw = function() {
		//this.clear();
		this.drawLayers();
		
	};
	
	this.clear = function() {
		$("#mapbackground").clearAll(false);
		$("#maptiles").clearAll(false);
	};
	
	this.drawLayers = function() {
			
		for(var i = 0; i < this.backgroundLayers.length; i++) {
			this.backgroundLayers[i].draw(this.tilesets, "#mapBackground");
		}	
		
		for(var i = 0; i < this.foregroundLayers.length; i++) {
			this.foregroundLayers[i].draw(this.tilesets, "#mapForeground");
		}	
	};
	
	//This function loads map information from the server(a JSON object) 
	//into this object. mapInfo is an evaluated JSON object.
	this.loadMap = function(mapInfo) {
    		
			this.mask = null;    		
    		
			this.width = mapInfo.width;
			this.height = mapInfo.height;
			this.tileWidth = mapInfo.tilewidth;
			this.tileHeight = mapInfo.tileheight;
		
			this.loadTileLayers(mapInfo.layers);
			this.loadTilesets(mapInfo.tilesets);

	};
	
	this.loadTileLayers = function(layers) {
		
		this.setLayerArrays(layers);
		var maskLoaded = false;
		var bgCounter = 0;
		var fgCounter = 0;
		for(var i = 0; i < layers.length; i++) {
			if (layers[i].name == "mask") {
				this.mask = this.loadLayerTiles(layers[i].data,layers[i].width, layers[i].height);
				console.log("mask loaded");
				maskLoaded = true;
			}
			else {
				var layer = new TileMapLayer();
				layer.height = layers[i].height;
				layer.width = layers[i].width;
				layer.tiles = this.loadLayerTiles(layers[i].data,layers[i].width, layers[i].height);
				
				if (!maskLoaded) {
					this.backgroundLayers[bgCounter] = layer;
					bgCounter++;
				}
				else {
					this.foregroundLayers[fgCounter] = layer;
					fgCounter++;
				}
			}
		}
		
	};
	
	this.setLayerArrays = function(layers) {
		var maskPos = 0;
		for(var i = 0; i < layers.length; i++) {
			if (layers[i].name == "mask") {
				maskPos = i;
				break;
			}
		}
		this.backgroundLayers = new Array(maskPos);
		this.foregroundLayers = new Array(layers.length - (maskPos + 1))
	};

	//Loads the tile values into the 2d tiles array
	this.loadLayerTiles = function(data,layerWidth, layerHeight) {
		
		var tiles = this.createArray(layerWidth, layerHeight);
		var counter = 0;
		for(var i = 0; i < layerHeight; i++) {
			for(var j = 0; j < layerWidth; j++) {
				tiles[j][i] = data[counter];
				counter++;
			}
		}	
		return tiles;
	};
	
	this.loadTilesets = function(ts) {
		this.tilesets = new Array(ts.length);
		for(var i = 0; i < this.tilesets.length; i++) {
			this.tilesets[i] = new TileSet(ts[i].firstgid,ts[i].image,ts[i].tileheight,
											ts[i].tilewidth,ts[i].imageheight,ts[i].imagewidth);	
		}	
	};
	
	

	
	//Creates a 2D array with the specified width and height
	this.createArray = function(width,height) {
		var arr = new Array(width);
		
		for(var i = 0; i < width; i++) {
			arr[i] = new Array(height);
		}
	
		return arr;
	};
	
	//10X10
	this.testPackage = '{ "height":10, "layers":[ { "data":[107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107], "height":10, "name":"Tile Layer 1", "opacity":1, "type":"tilelayer", "visible":true, "width":10, "x":0, "y":0 }, { "data":[699, 700, 0, 0, 0, 0, 0, 0, 0, 0, 731, 732, 0, 0, 576, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 697, 698, 0, 0, 0, 0, 0, 0, 0, 0, 729, 730, 0, 0, 699, 700, 0, 0, 0, 0, 0, 0, 0, 0, 731, 732, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 672, 0, 0, 575, 0, 0, 0, 0, 0, 0, 704, 0, 0, 0, 701, 0, 0, 0, 0, 0, 0, 0, 697, 698, 733, 0, 0, 0, 0, 0, 0, 0, 729, 730], "height":10, "name":"Tile Layer 2", "opacity":1, "type":"tilelayer", "visible":true, "width":10, "x":0, "y":0 }, { "data":[0, 0, 0, 641, 642, 643, 0, 0, 0, 0, 553, 0, 0, 641, 642, 643, 0, 0, 0, 0, 0, 0, 0, 577, 578, 579, 0, 0, 0, 350, 0, 0, 0, 609, 610, 611, 0, 0, 0, 382, 0, 0, 0, 641, 642, 643, 0, 0, 0, 414, 0, 0, 0, 673, 674, 675, 0, 0, 0, 0, 0, 0, 0, 705, 706, 707, 350, 0, 0, 0, 0, 0, 0, 0, 0, 0, 382, 0, 0, 0, 0, 0, 0, 0, 0, 0, 414, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 556], "height":10, "name":"Tile Layer 3", "opacity":1, "type":"tilelayer", "visible":true, "width":10, "x":0, "y":0 }], "orientation":"orthogonal", "properties": { }, "tileheight":32, "tilesets":[ { "firstgid":1, "image":"terrain.png", "imageheight":1024, "imagewidth":1024, "margin":0, "name":"terrain", "properties": { }, "spacing":0, "tileheight":32, "tilewidth":32 }], "tilewidth":32, "version":1, "width":10 }';
	this.masktest = '{ "height":10, "layers":[ { "data":[103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103], "height":10, "name":"Tile Layer 1", "opacity":1, "type":"tilelayer", "visible":true, "width":15, "x":0, "y":0 }, { "data":[2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], "height":10, "name":"mask", "opacity":1, "type":"tilelayer", "visible":true, "width":15, "x":0, "y":0 }, { "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 186, 0, 0, 0, 0, 0, 0, 0, 198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 184, 0, 0, 0, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 185, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "height":10, "name":"Tile Layer 2", "opacity":1, "type":"tilelayer", "visible":true, "width":15, "x":0, "y":0 }, { "data":[635, 636, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 352, 0, 667, 668, 0, 0, 0, 0, 0, 0, 0, 0, 450, 0, 0, 384, 0, 0, 0, 0, 0, 0, 639, 0, 0, 0, 0, 482, 0, 0, 416, 0, 0, 0, 0, 0, 0, 671, 0, 0, 0, 0, 514, 0, 0, 0, 0, 0, 0, 0, 0, 0, 321, 322, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 353, 354, 0, 0, 0, 0, 0, 0, 352, 0, 0, 0, 0, 0, 0, 385, 386, 0, 0, 0, 0, 0, 0, 384, 0, 0, 0, 0, 0, 0, 417, 418, 0, 0, 0, 637, 638, 0, 416, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 669, 670, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "height":10, "name":"Tile Layer 4", "opacity":1, "type":"tilelayer", "visible":true, "width":15, "x":0, "y":0 }], "orientation":"orthogonal", "properties": { }, "tileheight":32, "tilesets":[ { "firstgid":1, "image":"mask.png", "imageheight":32, "imagewidth":64, "margin":0, "name":"mask", "properties": { }, "spacing":0, "tileheight":32, "tilewidth":32 }, { "firstgid":3, "image":"terrain.png", "imageheight":1024, "imagewidth":1024, "margin":0, "name":"terrain", "properties": { }, "spacing":0, "tileheight":32, "tilewidth":32 }], "tilewidth":32, "version":1, "width":15 }';
}
