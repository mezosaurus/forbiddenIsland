/*
* Main application functions
* Authors: Ethan Hayes, Colton Lillywhite, Devon Winkler, Logan Gore
*/
$(function(){
    $('body').on('tileClick', function(event, x, y, name, which){
        tileClickListener(x, y, name, which);
    });
    $('.btn').on('click', function(event) {
    	actionMode = event.target.id;
    });
});

/** GLOBAL VARS **/
var players = [];
var actionMode = "move";
// Turn - integer for each player
var turn = 0;
var height = 600;
var width = 1280;

// GAME BOARD
var gameBoard = [];
// Init empty 6x6 2D Array
while(gameBoard.push([]) < 6);

/***************/

// pixi stage with grey background
var stage = new PIXI.Stage(0x888888);
// renderer instance with height and width
var renderer = PIXI.autoDetectRenderer(width, height);

// empty container
var gameContainer = new PIXI.DisplayObjectContainer();
stage.addChild(gameContainer);
// add renderer view element to DOM
document.body.appendChild(renderer.view);
// Get normal texture
var texture = PIXI.Texture.fromImage("img/tile.png");
// Get flooded texture

var pizzaTexture = PIXI.Texture.fromImage("img/pizza.png");
var pizzaObtainableTexture = PIXI.Texture.fromImage("img/pizza.png");
var pizzaEatenTexture = PIXI.Texture.fromImage("img/pizzaeaten.png");

// Players
var p1 = new Player(1, 1, PIXI.Sprite.fromImage("img/bunny.png"), new PlayerHand("Player 1", "Pilot"), "Pilot");
players.push(p1);
var p2 = new Player(1, 4, PIXI.Sprite.fromImage("img/bunny.png"), new PlayerHand("Player 2", "Pilot"), "Engineer");
players.push(p2);
var p3 = new Player(4, 1, PIXI.Sprite.fromImage("img/bunny.png"), new PlayerHand("Player 3", "Pilot"), "Diver");
players.push(p3);
var p4 = new Player(4, 4, PIXI.Sprite.fromImage("img/bunny.png"), new PlayerHand("Player 4", "Pilot"), "Explorer");
players.push(p4);

/* TILE GRID
*   ABCDEF
* 1   xx
* 2  xxxx
* 3 xxxxxx
* 4 xxxxxx
* 5  xxxx
* 6   xx
*/

// Generate tile grid
drawTileGrid(gameContainer, texture, texture);
gameBoard[1][1].addChild(p1.sprite);
gameBoard[1][4].addChild(p2.sprite);
gameBoard[4][1].addChild(p3.sprite);
gameBoard[4][4].addChild(p4.sprite);

// Draw player name text, 5 px padding
drawPlayerHands(stage, 4);
drawTreasures(stage);

// Draw card decks
drawFloodDeck(stage);
drawTreasureDeck(stage);

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
			var tile = new Tile(normalTexture, floodedTexture, i, j, 'tile_' + i + '_' + j);
			// Skip tile positions on first row that need to be blank
			if ((i == 0 && j == 0) || (i == 0 && j == 1) || (i == 0 && j == 4) || (i == 0 && j == 5))  {
				tile.sink();
			}
			// Skip tile positions on second row that need to be blank
			if ((i == 1 && j == 0) || (i == 1 && j == 5)) {
				tile.sink();
			}
			// Skip tile positions on fifth row that need to be blank
			if ((i == 4 && j == 0) || (i == 4 && j == 5)) {
				tile.sink();
			}
			// Skip tile positions on sixth row that need to be blank
			if ((i == 5 && j == 0) || (i == 5 && j == 1) || (i == 5 && j == 4) || (i == 5 && j == 5)) {
				tile.sink();
			}
			
			// Push tile object onto gameboard 2D Array
			gameBoard[i][j] = tile;
			gameContainer.addChild(tile);
		}
	}
}

/*
* Function responsible for drawing player indicators above tiles
*/
function drawPlayerPositions() {

}

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
	p4text.position.x = width-p4text.width;
	p4text.position.y = 5;
	var p1text = new PIXI.Text("Player 1", {font:"20px Arial", fill:"red"});
	p1text.position.x = 5;
	p1text.position.y = height-p1text.height;
	var p2text = new PIXI.Text("Player 2", {font:"20px Arial", fill:"red"});
	p2text.position.x = width-p2text.width;
	p2text.position.y = height-p2text.height;
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
  treasureSquare.drawRect(0, 0, 80, 110);
  treasureSquare.hitArea = treasureSquare.getBounds();
  treasureSquare.position.x = width - 100;
  treasureSquare.position.y = (height/2) - 120;
  treasureSquareText.position.x = width - 110;
  treasureSquareText.position.y = (height/2) - 140;
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
  floodSquare.drawRect(0, 0, 80, 110);
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

function drawTreasures(gameContainer) {
  // Create a container for all of the treasure stuff
  var treasureContainer = new PIXI.DisplayObjectContainer();
  var treasureContainerWidth = 300;
  var treasureContainerHeight = 80;
  treasureContainer.position.x = width/2 - treasureContainerWidth/2;
  treasureContainer.position.y = 10;

  // Make a container box for the treasures
  var treasureSquare = new PIXI.Graphics();
  treasureSquare.beginFill(0xFFFF6E);
  treasureSquare.lineStyle(5, 0xFFFFCC);
  treasureSquare.drawRect(0, 0, treasureContainerWidth, treasureContainerHeight);
  treasureSquare.hitArea = treasureSquare.getBounds();
  treasureSquare.position.x = 0;
  treasureSquare.position.y = 0;

  // Make some labels for treasure stacks
  var treasureText  = new PIXI.Text('Treasures', {font: "15px Arial"});
  treasureText.position.x = treasureContainerWidth/2 - 20;
  treasureText.position.y = 5;

  // Create the treaures and display them
  var treasure1 = new Treasure(pizzaTexture, pizzaObtainableTexture, pizzaEatenTexture);
  treasure1.x = 35;
  treasure1.y = 45;

  // Add everything to the containers
  treasureContainer.addChild(treasureSquare);
  treasureContainer.addChild(treasure1);
  treasureContainer.addChild(treasureText);

  gameContainer.addChild(treasureContainer);
}
