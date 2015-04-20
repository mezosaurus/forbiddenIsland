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

  this.addChild(sampleCardSquare);
  this.addChild(sampleCardText);

  sampleCardSquare.mousedown = sampleCardSquare.touchstart = function(data) {
    alert("You clicked a treasure card!");
  };
};

TreasureCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
TreasureCard.constructor = TreasureCard;
