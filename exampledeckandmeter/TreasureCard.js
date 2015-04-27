var TreasureCard = function() {
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


  // draw a diamond (a square rotated to stand on one corner).
  var diamond = new PIXI.Graphics();
  diamond.lineStyle(0, 0xFFFF66);
  diamond.beginFill(0xFFFF66);
  diamond.drawRect(0, 0, 50, 50);
      // This defines the center.
  diamond.position.x = this.position.x + 5;
  diamond.position.y = this.position.y + 80;
      // This says to pivot around the center.
  diamond.pivot = new PIXI.Point(this.position.x, this.position.y);
      // This rotates the square 45 degrees, so that it becomes a diamond standing on its point.
  diamond.rotation = 62.05;

  this.addChild(sampleCardSquare);
  this.addChild(sampleCardText);
  this.addChild(diamond);

  sampleCardSquare.mousedown = sampleCardSquare.touchstart = function(data) {
    alert("You clicked a treasure card!");
  };
};

TreasureCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
TreasureCard.constructor = TreasureCard;
