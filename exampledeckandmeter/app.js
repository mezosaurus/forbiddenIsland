/*
 * Author: Logan Gore
 * Simple example of decks and how the water meter operates
 */

// create an new instance of a pixi stage with a grey background
var stage = new PIXI.Stage(0x888888);

//Player Creation
var player1 = new Player("player 1", "test");
var player2 = new Player("player 2", "test");
var player3 = new Player("player 3", "test");
var player4 = new Player("player 4", "test");

// create a renderer instance with the viewports width and height
var width = $(window).width();
var height = $(window).height();
var renderer = PIXI.autoDetectRenderer(width, height);

// create empty containers for the decks and water meter
var gameContainer = new PIXI.DisplayObjectContainer();
var treasureDeck = new PIXI.DisplayObjectContainer();
var floodDeck = new PIXI.DisplayObjectContainer();
var waterMeter = new PIXI.DisplayObjectContainer();

//Keeps track of where the water level is
var waterLevel = 0;

// add the containers to the stage
stage.addChild(gameContainer);
stage.addChild(treasureDeck);
stage.addChild(floodDeck);
stage.addChild(waterMeter);
stage.addChild(player1);
stage.addChild(player2);

player1.position.x = width - (width - 5);
player1.position.y = height - 160;
player2.position.x = width - 490;
player2.position.y = height - 160;

 // add the renderer view element to the DOM
document.body.appendChild(renderer.view);

/*
 * TREASURE DECK
 */
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

/*
 * END TREASURE DECK
 */

/*
 * FLOOD DECK
 */
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

/*
 * END FLOOD DECK
 */

/*
 * WATER METER
 */
var waterMeterY = waterMeter.position.y;
var waterMeterX = waterMeter.position.x;
var mainWaterLine = new PIXI.Graphics();
var currentWaterLine = new PIXI.Graphics();
var level1Text  = new PIXI.Text('2', {font: "15px Arial"});
var level2Text  = new PIXI.Text('-', {font: "15px Arial"});
var level3Text  = new PIXI.Text('3', {font: "15px Arial"});
var level4Text  = new PIXI.Text('-', {font: "15px Arial"});
var level5Text  = new PIXI.Text('4', {font: "15px Arial"});
var captionText  = new PIXI.Text('Water Level', {font: "15px Arial"});

mainWaterLine.beginFill(0x000000);
mainWaterLine.drawRect(0, 0, 10, 160);
mainWaterLine.position.x = waterMeterX;
mainWaterLine.position.y = waterMeterY + 5;

captionText.position.x = waterMeterX - 20;
captionText.position.y = waterMeterY - 20;
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
level4Text.position.y = waterMeterX + 50;
waterMeter.addChild(level4Text);

level5Text.position.x = waterMeterX + 30;
level5Text.position.y = waterMeterX + 20;
waterMeter.addChild(level5Text);


currentWaterLine.beginFill(0xB80000);
currentWaterLine.drawRect(0, 0, 40, 5);
currentWaterLine.position.x = waterMeterX - 15;
currentWaterLine.position.y = waterMeterY + 145;

waterMeter.addChild(mainWaterLine);
waterMeter.addChild(currentWaterLine);

waterMeter.position.x = width - (width - 20);
waterMeter.position.y = (height/2) - 100;
/*
 * END WATER METER
 */

//Register actions to both of the decks
treasureSquare.mousedown = treasureSquare.touchstart = function(data) {
  if (waterLevel != 4)
  {
    alert("Waters Rise card has been revealed - Water level has risen!");
    player1.addCard(new HelicopterLiftCard());
    player1.addCard(new TreasureCard());
    player2.addCard(new HelicopterLiftCard());
    player2.addCard(new TreasureCard());
    currentWaterLine.position.y = currentWaterLine.position.y - 30;
    waterLevel++;
  }
};

floodSquare.mousedown = floodSquare.touchstart = function(data) {
  alert("Flood Square clicked!");
};

requestAnimFrame(animate);

function animate() {
  requestAnimFrame(animate);
  renderer.render(stage);
}
