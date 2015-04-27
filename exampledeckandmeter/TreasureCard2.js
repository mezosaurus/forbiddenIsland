var TreasureCard2 = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = "Treasure Card";

  //SAMPLE card creation
  sampleCardSquare = new PIXI.Graphics();
  sampleCardText = new PIXI.Text("Treasure", {font: '10px Arial'});
  sampleCardSquare.beginFill(0xFFFFFF);
  sampleCardSquare.lineStyle(5, 0x000000);
  sampleCardSquare.drawRect(0, 0, 80, 150);
  sampleCardText.position.x = this.position.x + 20;
  sampleCardText.position.y = this.position.y + 20;
  sampleCardSquare.interactive = true;
  sampleCardSquare.hitArea = sampleCardSquare.getBounds();

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

  this.addChild(sampleCardSquare);
  this.addChild(sampleCardText);
  this.addChild(pentagon);

  sampleCardSquare.mousedown = sampleCardSquare.touchstart = function(data) {
    alert("You clicked a treasure card!");
  };
};

TreasureCard2.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
TreasureCard2.constructor = TreasureCard2;
