var WatersRiseCard = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = "Sample Card";

  //SAMPLE card creation
  sampleCardSquare = new PIXI.Graphics();
  sampleCardText = new PIXI.Text("HelicopterLift", {font: '10px Arial'});
  sampleCardSquare.beginFill(0xFFFFFF);
  sampleCardSquare.lineStyle(5, 0x000000);
  sampleCardSquare.drawRect(0, 0, 80, 150);
  sampleCardText.position.x = this.position.x + 15;
  sampleCardText.position.y = this.position.y + 20;

  this.addChild(sampleCardSquare);
  this.addChild(sampleCardText);

};

WatersRiseCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
WatersRiseCard.constructor = WatersRiseCard;
