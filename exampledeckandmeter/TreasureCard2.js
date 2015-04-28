var TreasureCard2 = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = "Treasure Card";

  //SAMPLE card creation
  treasureCardSquare = new PIXI.Graphics();
  treasureCardText = new PIXI.Text("Treasure", {font: '10px Arial'});
  treasureCardSquare.beginFill(0xFFFFFF);
  treasureCardSquare.lineStyle(5, 0x000000);
  treasureCardSquare.drawRect(0, 0, 80, 150);
  treasureCardText.position.x = this.position.x + 20;
  treasureCardText.position.y = this.position.y + 20;
  treasureCardSquare.interactive = true;
  treasureCardSquare.hitArea = treasureCardSquare.getBounds();

    // create a new graphics object
  var pentagon = new PIXI.Graphics();

  // begin a green fill..
  pentagon.beginFill(0x00FF00);

  // draw a triangle using lines
  pentagon.moveTo(0,0);
  pentagon.lineTo(-40, 50);
  pentagon.lineTo(40, 50);
  pentagon.lineTo(40, 100);
  //pentagon.lineTo(-40,100);

  // end the fill
  pentagon.endFill();

  this.addChild(treasureCardSquare);
  this.addChild(treasureCardText);
  this.addChild(pentagon);

  treasureCardSquare.mousedown = treasureCardSquare.touchstart = function(data) {
    alert("You clicked a treasure card!");
  };
};

TreasureCard2.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
TreasureCard2.constructor = TreasureCard2;
