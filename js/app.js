/*
* Main application functions
* Authors: Ethan Hayes, Colton Lillywhite, Devon Winkler, Logan Gore
*/
$(function(){
    $('body').on('tileClick', function(event, x, y, name, which){
        tileClickListener(x, y, name, which);
    });
    $('body').on('treasureClick', function(event, type, which){
        treasureClickListener(type, which);
    });
    $('body').on('cardClick', function(event, type){
        cardClickListener(type);
    });
    // set action mode
    $('.btn-group > .btn').on('click', function(event) {
      actionMode = event.target.id;
      var player = players[turn];
    });
    $('body').on('pawnClick', function(evend, index){
        pawnClickListener(index);
    });
});

// Init empty 6x6 2D Array
while(gameBoard.push([]) < 6);

/***************/

// pixi stage with grey background
var stage = new PIXI.Stage(0xE8E8E8);
var background = new PIXI.Sprite.fromImage("img/water.jpg");
background.width = 400;
background.height = 400;
background.x = 180 - 35;
background.y = 130 - 35;
// renderer instance with height and width
var renderer = PIXI.autoDetectRenderer(width, height);

// empty container
var gameContainer = new PIXI.DisplayObjectContainer();
stage.addChild(background);
stage.addChild(gameContainer);
// add renderer view element to DOM
document.body.appendChild(renderer.view);
// Get normal texture
var texture = PIXI.Texture.fromImage("img/sand.png");
// Get flooded texture

// Get the tresure images
var cupcakeTexture = PIXI.Texture.fromImage("img/cupcake.png");
var cupcakeObtainableTexture = PIXI.Texture.fromImage("img/cupcake.png");
var cupcakeEatenTexture = PIXI.Texture.fromImage("img/cupcakeeaten.png");

var pizzaTexture = PIXI.Texture.fromImage("img/pizza.png");
var pizzaObtainableTexture = PIXI.Texture.fromImage("img/pizza.png");
var pizzaEatenTexture = PIXI.Texture.fromImage("img/pizzaeaten.png");

var sodaTexture = PIXI.Texture.fromImage("img/soda.png");
var sodaObtainableTexture = PIXI.Texture.fromImage("img/soda.png");
var sodaEatenTexture = PIXI.Texture.fromImage("img/sodaeaten.png");

var donutTexture = PIXI.Texture.fromImage("img/donut.png");
var donutObtainableTexture = PIXI.Texture.fromImage("img/donut.png");
var donutEatenTexture = PIXI.Texture.fromImage("img/donuteaten.png");

var treasureTextures = [cupcakeTexture, pizzaTexture, sodaTexture, donutTexture];

var actionCounterText;

// Players
var tokenTexture = PIXI.Texture.fromImage("img/bunny.png");

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
placeHelipad();

// add pawns and treasures to board
drawTreasurePositions();

// Draw treasures
drawTreasures(stage);

// Draw card decks
drawFloodDeck(stage);
drawTreasureDeck(stage);

//Draw water meter, current water line is needed to adjust water level
var currentWaterLine = new PIXI.Graphics();
drawWaterMeter(stage);

requestAnimFrame(animate);

function animate() {
	requestAnimFrame(animate);
    var tiles = gameContainer.children;
    for(var i = 0; i < tiles.length; i++){
        var tile = tiles[i];
        tile.animate();
    }

    for(var i=0; i < treasures.length; i++){
        var treasure = treasures[i];
        treasure.animate();
    }

    for(var i = 0; i < players.length; i++){
        var player = players[i];
        player.sprite.animate();
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
				tile.alpha=0;
                tile.state = "sunk";
                tile.buttonMode = false;
                tile.interactive = false;
			}
			// Skip tile positions on second row that need to be blank
			if ((i == 1 && j == 0) || (i == 1 && j == 5)) {
				tile.alpha=0;
                tile.state = "sunk";
                tile.buttonMode = false;
                tile.interactive = false;
			}
			// Skip tile positions on fifth row that need to be blank
			if ((i == 4 && j == 0) || (i == 4 && j == 5)) {
				tile.alpha=0;
                tile.state = "sunk";
                tile.buttonMode = false;
                tile.interactive = false;
			}
			// Skip tile positions on sixth row that need to be blank
			if ((i == 5 && j == 0) || (i == 5 && j == 1) || (i == 5 && j == 4) || (i == 5 && j == 5)) {
				tile.alpha=0;
                tile.state = "sunk";
                tile.buttonMode = false;
                tile.interactive = false;
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
  for(var i = 0; i < players.length; i++){
    var player = players[i];
    var x = Math.floor(Math.random() * 5);
    var y = Math.floor(Math.random() * 5);
    var tile = gameBoard[x][y];
    if (player.role === "Pilot"){
      x = helipadX;
      y = helipadY;
      tile = gameBoard[x][y];
    }else{
      while(tile.state === "sunk" || tile.children.length > 0 || x == helipadX || y == helipadY){
        x = Math.floor(Math.random() * 5);
        y = Math.floor(Math.random() * 5);
        tile = gameBoard[x][y];
      }
    }
    tile.addChild(player.sprite);
    player.x = x;
    player.y = y;
    player.initValidActionTiles();
    player.calculateValidMoveTiles(player.x, player.y, player.validMoveTiles);
    player.calculateValidNavigatorTiles();
    player.calculateValidShoreTiles();
    player.calculateValidGiveTargets();
  }
}

/*
* Function responsible for adding the treasure locations to the board
*/
function drawTreasurePositions(){
  var treasureValues = [0,0,1,1,2,2,3,3];
  for(var i = 0; i < treasureValues.length; i++){
    //console.log(treasureValues[i]);
    var x = Math.floor(Math.random() * 5);
    var y = Math.floor(Math.random() * 5);
    var tile = gameBoard[x][y];
    while(tile.state === "sunk" || tile.treasureType >= 0 || x == helipadX || y == helipadY){
      x = Math.floor(Math.random() * 5);
      y = Math.floor(Math.random() * 5);
      tile = gameBoard[x][y];
    }
    var sprite = new PIXI.Sprite(treasureTextures[treasureValues[i]]);
    sprite.scale.x = .25;
    sprite.scale.y = .25;
    sprite.anchor.x = .5;
    sprite.anchor.y = .5;
    tile.addChild(sprite);
    tile.treasureType = treasureValues[i];

  }

}

/*
* Function responsible for drawing player hands in the corners
* Player 4 --------- Player 3
* |                         |
* |                         |
* Player 1 --------- Player 2
*/
function drawPlayerHands(gameContainer) {
  for (var i = 0; i < players.length; i++) {
    var playerNum = i+1;
    var player = players[i];
    var text = new PIXI.Text("Player " + playerNum + " - " + player.role, {font:"20px Arial", fill:"black"});
    var roleColorSquare = new PIXI.Graphics();
    roleColorSquare.beginFill(roleColors[player.role]);

    //roleColorSquare.lineStyle(1, 0x000000);
    roleColorSquare.drawRect(0, 0, 20, 20);
    //treasureSquare.hitArea = treasureSquare.getBounds();
    var background = new PIXI.Graphics();
    background.beginFill(0xc8c8c8);
    background.drawRect(0, 0, 400, 65);
    background.interactive = true;
    background.hitArea = background.getBounds();

    // player 1
    if (i == 0) {
      text.position.x = 5;
      text.position.y = height - text.height - 70;
      roleColorSquare.position.x = text.position.x + text.width + 5;
      roleColorSquare.position.y = text.position.y;
      player.hand.position.x = 5;
      player.hand.position.y = (height-65);
    }
    // player 2
    else if (i == 1) {
      text.position.x = width - text.width - 5;
      text.position.y = height - text.height - 70;
      roleColorSquare.position.x = text.position.x - roleColorSquare.width - 5;
      roleColorSquare.position.y = text.position.y;
      player.hand.position.x = width - 385;
      player.hand.position.y = (height-65);
    }
    // player 3
    else if (i == 2) {
      text.position.x = 5;
      text.position.y = 70;
      roleColorSquare.position.x = text.position.x + text.width + 5;
      roleColorSquare.position.y = text.position.y;
      player.hand.position.x = 5;
      player.hand.position.y = 5;
    }
    // player 4
    else if (i == 3) {
      text.position.x = width - text.width - 5;
      text.position.y = 70;
      roleColorSquare.position.x = text.position.x  - roleColorSquare.width - 5;
      roleColorSquare.position.y = text.position.y;
      player.hand.position.x = width - 385;
      player.hand.position.y = 5;
    }
    background.position.x = player.hand.position.x;
    background.position.y = player.hand.position.y;
    gameContainer.addChild(text);
    gameContainer.addChild(roleColorSquare);
    gameContainer.addChild(background);
    gameContainer.addChild(player.hand);

  }
}

function drawActionCounter() {
  stage.removeChild(actionCounterText);
  delete actionCounterText;

  actionCounterText = new PIXI.Text("", {font:"20px Arial", fill:"black"});
  actionCounterText.text = "Player " + (turn + 1) + "'s turn        Actions left: " + turnActions + "\n";

  actionCounterText.text += "\nClick the Treasures Deck then\n     the Flood Deck to end your turn";
  actionCounterText.text += "\nOr use an action card at any time";

  actionCounterText.position.x = 700;
  actionCounterText.position.y = 350;

  stage.addChild(actionCounterText);
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

  //create treasure deck
  treasureCards.push(new SandbagCard());
  treasureCards.push(new SandbagCard());

  treasureCards.push(new HelicopterLiftCard());
  treasureCards.push(new HelicopterLiftCard());
  treasureCards.push(new HelicopterLiftCard());

  treasureCards.push(new WatersRiseCard());
  treasureCards.push(new WatersRiseCard());
  treasureCards.push(new WatersRiseCard());

  for (var i = 0; i < 5; i++)
  {
    treasureCards.push(new CupcakeCard());
    treasureCards.push(new PizzaCard());
    treasureCards.push(new DonutCard());
    treasureCards.push(new SodaCard());
  }

  treasureCards = shuffleCards(treasureCards);
  //Whenever player clicks the treasure deck
  treasureSquare.mousedown = treasureSquare.touchstart = function(data) {

    if (!treasureDeckClicked)
    {
      //logic for checking if player wants to continue if they have actions left
      var confirmAction = false;
      if (turnActions !== 0)
        confirmAction = confirm("You still have " + turnActions + " action(s) left\n" +
          "Are you sure you want to continue?");

      if (turnActions === 0 || confirmAction === true)
      {
        treasureDeckClicked = true;
        if (treasureCards.length === 0)
        {
          treasureCards = shuffleCards(discardedTreasureCards);
          discardedTreasureCards = [];
        }

        var card1 = drawCard();
        var card2 = drawCard();

        if (card1.type != "WatersRise")
          players[turn].hand.addCard(card1);

        if (card2.type != "WatersRise")
          players[turn].hand.addCard(card2);

        turnActions = 0;
        drawActionCounter();
      }
    }
  };
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

  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      var card = new FloodCard(i, j);
      // Skip card positions on first row that need to be blank
      if ((i == 0 && j == 0) || (i == 0 && j == 1) || (i == 0 && j == 4) || (i == 0 && j == 5))  {
        continue;
      }
      // Skip cards positions on second row that need to be blank
      if ((i == 1 && j == 0) || (i == 1 && j == 5)) {
        continue;
      }
      // Skip card positions on fifth row that need to be blank
      if ((i == 4 && j == 0) || (i == 4 && j == 5)) {
        continue;
      }
      // Skip card positions on sixth row that need to be blank
      if ((i == 5 && j == 0) || (i == 5 && j == 1) || (i == 5 && j == 4) || (i == 5 && j == 5)) {
        continue;
      }
      floodCards.push(card);
    }
  }
  //After all the cards are added shuffle them
  floodCards = shuffleCards(floodCards);

  floodSquare.mousedown = floodSquare.touchstart = function(data) {
    if (treasureDeckClicked)
    {
        var addedCards = [];
        var cardWidth = width/2 - 50;
        var cardHeight = height/2;

        //Add each card per waterLevel
        for (var i = 0; i < waterLevels[waterLevel]; i++)
        {
          var card = floodCards.pop();
          //Push to addedCards so we know which ones to remove later
          addedCards.push(card);

          var tile = gameBoard[card.column][card.row];

          if (tile.state === "normal")
            tile.flip();
          else
            tile.sink();
        }

        //For all the cards added this turn, add them to discardedFloodCards
        for (var i = 0; i < addedCards.length; i++)
        {
          discardedFloodCards.push(addedCards[i]);
        }

        //Wait for user to see cards before ending turn
        setTimeout(function () {
          endTurn();
        }, 500);
    }
    else
    {
      alert("Must click treasure deck before using flood deck");
    }
  };
}

/*
* Function responsible for drawing treasures
*/

function drawTreasures(gameContainer) {
  // Create a container for all of the treasure stuff
  var treasureContainer = new PIXI.DisplayObjectContainer();
  var treasureContainerWidth = 290;
  var treasureContainerHeight = 90;
  treasureContainer.position.x = 580 + treasureContainerWidth/2;
  treasureContainer.position.y = 150;

  // Make some labels for treasure stacks
  var treasureText  = new PIXI.Text('Treasures', {font: "15px Arial"});
  treasureText.position.x = (treasureContainerWidth - treasureText.width)/2;
  treasureText.position.y = 0;

  // Create the treaures and display them
  var treasure0 = new Treasure(cupcakeTexture, cupcakeObtainableTexture, cupcakeEatenTexture, 0);
  treasure0.x = 40;
  treasure0.y = treasureContainerHeight - 40;
  treasures.push(treasure0);

  var treasure1 = new Treasure(pizzaTexture, pizzaObtainableTexture, pizzaEatenTexture, 1);
  treasure1.x = 110;
  treasure1.y = treasureContainerHeight - 40;
  treasures.push(treasure1);

  var treasure2 = new Treasure(sodaTexture, sodaObtainableTexture, sodaEatenTexture, 2);
  treasure2.x = 180;
  treasure2.y = treasureContainerHeight - 40;
  treasures.push(treasure2);

  var treasure3 = new Treasure(donutTexture, donutObtainableTexture, donutEatenTexture, 3);
  treasure3.x = 250;
  treasure3.y = treasureContainerHeight - 40;
  treasures.push(treasure3);

  // Add everything to the containers
  treasureContainer.addChild(treasure0);
  treasureContainer.addChild(treasure1);
  treasureContainer.addChild(treasure2);
  treasureContainer.addChild(treasure3);
  treasureContainer.addChild(treasureText);

  gameContainer.addChild(treasureContainer);
}

function drawWaterMeter(gameContainer) {
  var waterMeter = new PIXI.DisplayObjectContainer();
  var waterMeterY = waterMeter.position.y;
  var waterMeterX = waterMeter.position.x;
  var mainWaterLine = new PIXI.Graphics();
  var level1Text  = new PIXI.Text('2', {font: "15px Arial"});
  var level2Text  = new PIXI.Text('-', {font: "15px Arial"});
  var level3Text  = new PIXI.Text('3', {font: "15px Arial"});
  var level4Text  = new PIXI.Text('-', {font: "15px Arial"});
  var level5Text  = new PIXI.Text('-', {font: "15px Arial"});
  var level6Text  = new PIXI.Text('4', {font: "15px Arial"});
  var level7Text  = new PIXI.Text('-', {font: "15px Arial"});
  var level8Text  = new PIXI.Text('5', {font: "15px Arial"});
  var level9Text  = new PIXI.Text('-', {font: "15px Arial"});
  var levelDeathText  = new PIXI.Text('Death', {font: "15px Arial"});
  var captionText  = new PIXI.Text('Water Level', {font: "15px Arial"});

  mainWaterLine.beginFill(0x000000);
  mainWaterLine.drawRect(0, 0, 10, 250);
  mainWaterLine.position.x = waterMeterX;
  mainWaterLine.position.y = waterMeterY - 95;

  captionText.position.x = waterMeterX - 20;
  captionText.position.y = waterMeterY - 130;
  waterMeter.addChild(captionText);

  level1Text.position.x = waterMeterX + 30 ;
  level1Text.position.y = waterMeterY + 140;
  waterMeter.addChild(level1Text);

  level2Text.position.x = waterMeterX + 30;
  level2Text.position.y = waterMeterY + 110;
  waterMeter.addChild(level2Text);

  level3Text.position.x = waterMeterX + 30;
  level3Text.position.y = waterMeterY + 80;
  waterMeter.addChild(level3Text);

  level4Text.position.x = waterMeterX + 30;
  level4Text.position.y = waterMeterY + 50;
  waterMeter.addChild(level4Text);

  level5Text.position.x = waterMeterX + 30;
  level5Text.position.y = waterMeterY + 20;
  waterMeter.addChild(level5Text);

  level6Text.position.x = waterMeterX + 30;
  level6Text.position.y = waterMeterY - 10;
  waterMeter.addChild(level6Text);

  level7Text.position.x = waterMeterX + 30;
  level7Text.position.y = waterMeterY - 40;
  waterMeter.addChild(level7Text);

  level8Text.position.x = waterMeterX + 30;
  level8Text.position.y = waterMeterY - 70;
  waterMeter.addChild(level8Text);

  levelDeathText.position.x = waterMeterX + 30;
  levelDeathText.position.y = waterMeterY  - 100;
  waterMeter.addChild(levelDeathText);


  currentWaterLine.beginFill(0xB80000);
  currentWaterLine.drawRect(0, 0, 40, 5);
  currentWaterLine.position.x = waterMeterX - 15;
  currentWaterLine.position.y = waterMeterY + 145;

  waterMeter.addChild(mainWaterLine);
  waterMeter.addChild(currentWaterLine);

  waterMeter.position.x = width - (width - 20);
  waterMeter.position.y = (height/2) - 100;

  gameContainer.addChild(waterMeter);
}

function drawCard() {
  var card = treasureCards.pop();
  discardedTreasureCards.push(Object.create(card));

  if (card.type == "WatersRise")
  {
    $("#waterRiseModal").modal("show");
    /*if (waterLevel != 5)
    {
      currentWaterLine.position.y = currentWaterLine.position.y - 30;
      waterLevel++;

      if (discardedFloodCards !== undefined || discardedFloodCards.length !== 0)
      {
        discardedFloodCards = shuffleCards(discardedFloodCards);
        floodCards = [].concat(floodCards, discardedFloodCards);
        alert(floodCards.length);
        discardedFloodCards = [];
      }
      //alert("Waters Rise Card! Water is rising!");
      if (waterLevel != 1 && waterLevel != 3)
      {
        currentWaterLevel++;
      }
    }

    if (waterLevel == 5)
    {
      alert("GAME OVER, you died");
    }*/
  }
  return card;
}

function placeHelipad(){
    var x = Math.floor(Math.random() * 5);
    var y = Math.floor(Math.random() * 5);
    var tile = gameBoard[x][y];
    while(tile.state === "sunk" || tile.children.length > 0){
      x = Math.floor(Math.random() * 5);
      y = Math.floor(Math.random() * 5);
      tile = gameBoard[x][y];
    }
    tile.setTexture(new PIXI.Texture.fromImage("img/helipad.jpg"));
    helipadX = x;
    helipadY = y;
}
