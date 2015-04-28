$(function(){
    $('body').on('tileClick', function(event, x, y, name){
        console.log('tileX: ', x);
        console.log('tileY: ', y);
        console.log('tileName: ', name);
    });
});

// GAME BOARD
var gameBoard = [];
// Init empty 6x6 2D Array
while(gameBoard.push([]) < 6);

// pixi stage with grey background
var stage = new PIXI.Stage(0x888888);
// renderer instance with height 640 width 480
var width = $(window).width();
var height = $(window).height();
var renderer = PIXI.autoDetectRenderer(width, height);
// empty container
var gameContainer = new PIXI.DisplayObjectContainer();
stage.addChild(gameContainer);
// add renderer view element to DOM
document.body.appendChild(renderer.view);
// Get normal texture
var texture = PIXI.Texture.fromImage("img/tile.png");
// Get flooded texture

/* TILE GRID
*   xx
*  xxxx
* xxxxxx
* xxxxxx
*  xxxx
*   xx
*/

// Generate tile grid
drawTileGrid(gameContainer, texture);

// Draw player name text, 5 px padding
drawPlayerHands(stage, 4);


requestAnimFrame(animate);

function animate() {
	requestAnimFrame(animate);
    var tiles = gameContainer.children;
    for(var i = 0; i < tiles.length; i++){
        var tile = tiles[i];
        tile.animate();
    }
	// render the stage
	renderer.render(stage);
}

/*
* Function responsible for drawing the tile grid, will need to be reworked for the two different textures so it redraws with the flooded texture where appropriate
*/
function drawTileGrid(gameContainer, normalTexture, floodedTexture) {
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			// Skip tile positions on first row that need to be blank
			if ((i == 0 && j == 0) || (i == 0 && j == 1) || (i == 0 && j == 4) || (i == 0 && j == 5)) {
				continue;
			}
			// Skip tile positions on second row that need to be blank
			if ((i == 1 && j == 0) || (i == 1 && j == 5)) {
				continue;
			}
			// Skip tile positions on fifth row that need to be blank
			if ((i == 4 && j == 0) || (i == 4 && j == 5)) {
				continue;
			}
			// Skip tile positions on sixth row that need to be blank
			if ((i == 5 && j == 0) || (i == 5 && j == 1) || (i == 5 && j == 4) || (i == 5 && j == 5)) {
				continue;
			}
			var tile = new Tile(normalTexture, floodedTexture, i, j, 'tile_' + i + '_' + j);
			// Push tile object onto gameboard 2D Array
			gameBoard[i][j] = tile;
			gameContainer.addChild(tile);
		}
	}
}

/*
* Function responsible for drawing player indicators above tiles
*/
function drawPlayerPositions(gameContainer, )

/*
* Function responsible for drawing player hands in the corners
* Player 4 --------- Player 3
* |                         |
* |                         |
* Player 1 --------- Player 2
*/
function drawPlayerHands(gameContainer, numPlayers) {
	var p3text = new PIXI.Text("Player 3", {font:"20px Arial", fill:"red"});
	p3text.position.x = 5;
	p3text.position.y = 5;
	var p4text = new PIXI.Text("Player 4", {font:"20px Arial", fill:"red"});
	p4text.position.x = 955-p4text.width;
	p4text.position.y = 5;
	var p1text = new PIXI.Text("Player 1", {font:"20px Arial", fill:"red"});
	p1text.position.x = 5;
	p1text.position.y = 955-p1text.height;
	var p2text = new PIXI.Text("Player 2", {font:"20px Arial", fill:"red"});
	p2text.position.x = 955-p2text.width;
	p2text.position.y = 955-p2text.height;
	gameContainer.addChild(p1text);
	gameContainer.addChild(p2text);
	gameContainer.addChild(p3text);
	gameContainer.addChild(p4text);
}

/*
* Function responsible for drawing treasure deck
*/
function drawTreasureDeck(gameContainer) {
  var treasureDeck = new PIXI.DisplayObjectContainer();
  var treasureSquare = new PIXI.Graphics();
  var treasureSquareText  = new PIXI.Text('Treasure Deck', {font: "15px Arial"});
  treasureSquare.beginFill(0x6B0000);
  treasureSquare.lineStyle(5, 0xFF0000);
  treasureSquare.drawRect(0, 0, 80, 150);
  treasureSquare.hitArea = treasureSquare.getBounds();
  treasureSquare.position.x = width - 100;
  treasureSquare.position.y = (height/2) - 160;
  treasureSquareText.position.x = width - 110;
  treasureSquareText.position.y = (height/2) - 180;
  treasureSquare.buttonMode = true;
  treasureSquare.interactive = true;
  treasureDeck.addChild(treasureSquare);
  treasureDeck.addChild(treasureSquareText);

  gameContainer.addChild(treasureDeck);
  //TODO: Add Deck formation with given card classes and then shuffle
}

/*
* Function responsible for drawing flood deck
*/
function drawFloodDeck(gameContainer) {
  var floodDeck = new PIXI.DisplayObjectContainer();
  var floodSquare = new PIXI.Graphics();
  var floodSquareText  = new PIXI.Text('Flood Deck', {font: "15px Arial"});

  floodSquare.beginFill(0x00006E);
  floodSquare.lineStyle(5, 0x1919BF);
  floodSquare.drawRect(0, 0, 80, 150);
  floodSquare.hitArea = floodSquare.getBounds();
  floodSquare.position.x = width - 100;
  floodSquare.position.y = (height/2) + 20;
  floodSquareText.position.x = width - 110;
  floodSquareText.position.y = (height/2);
  floodSquare.buttonMode = true;
  floodSquare.interactive = true;
  floodDeck.addChild(floodSquare);
  floodDeck.addChild(floodSquareText);

  gameContainer.addChild(floodDeck);
}

/*
* Function responsible for drawing treasures
*/
function drawTresures(gameContainer) {

}
