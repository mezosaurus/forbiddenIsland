/*
 * Author: Logan Gore
 * Simple example of decks and how the water meter operates
 */

/*
 * CARD CLASSES(Planning on breaking these into separate files eventually)
 */
var SampleCard = function() {
  this.card = new PIXI.DisplayObjectContainer();
  this.type = "Sample Card";

  //SAMPLE card creation
  sampleCardSquare = new PIXI.Graphics();
  sampleCardText = new PIXI.Text("Sample", {font: '10px Arial'});
  sampleCardSquare.beginFill(0xFFFFFF);
  sampleCardSquare.lineStyle(5, 0x000000);
  sampleCardSquare.drawRect(0, 0, 80, 150);
  sampleCardSquare.position.x = 20;
  sampleCardSquare.position.y = 800;
  sampleCardText.position.x = 30;
  sampleCardText.position.y = 850;

  this.card.addChild(sampleCardSquare);
  this.card.addChild(sampleCardText);

};

/*
 * END CARD CLASSES
 */


// create an new instance of a pixi stage with a grey background
var stage = new PIXI.Stage(0x888888);
// create a renderer instance 
var renderer = PIXI.autoDetectRenderer(960,960);
// create empty containers for each logical unit
var gameContainer = new PIXI.DisplayObjectContainer();
var treasureDeck = new PIXI.DisplayObjectContainer();
var floodDeck = new PIXI.DisplayObjectContainer();
var waterMeter = new PIXI.DisplayObjectContainer();

//Keeps track of where the water level is
var waterLevel = 0;
var sampleCard = new SampleCard();

// add the containers to the stage
stage.addChild(gameContainer);
stage.addChild(treasureDeck);
stage.addChild(floodDeck);
stage.addChild(waterMeter);
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
treasureSquare.position.x = 870;
treasureSquare.position.y = 200;
treasureSquareText.position.x = 860;
treasureSquareText.position.y = 185;
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
floodSquare.position.x = 870;
floodSquare.position.y = 390;
floodSquareText.position.x = 870;
floodSquareText.position.y = 375;
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
mainWaterLine.position.x = 20;
mainWaterLine.position.y = 275;

captionText.position.x = 10;
captionText.position.y = 250;
waterMeter.addChild(captionText);

level1Text.position.x = 50;
level1Text.position.y = 415;
waterMeter.addChild(level1Text);

level2Text.position.x = 50;
level2Text.position.y = 380;
waterMeter.addChild(level2Text);

level3Text.position.x = 50;
level3Text.position.y = 345;
waterMeter.addChild(level3Text);

level4Text.position.x = 50;
level4Text.position.y = 310;
waterMeter.addChild(level4Text);

level5Text.position.x = 50;
level5Text.position.y = 275;
waterMeter.addChild(level5Text);


currentWaterLine.beginFill(0xB80000);
currentWaterLine.drawRect(0, 0, 40, 5);
currentWaterLine.position.x = 5;
currentWaterLine.position.y = 420;

waterMeter.addChild(mainWaterLine);
waterMeter.addChild(currentWaterLine);

/*
 * END WATER METER
 */

//Register actions to both of the decks
treasureSquare.mousedown = treasureSquare.touchstart = function(data) {
  if (waterLevel != 4)
  {
    alert("Waters Rise card has been revealed - Water level has risen!");
    gameContainer.addChild(sampleCard.card);
    currentWaterLine.position.y = currentWaterLine.position.y - 35;
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
