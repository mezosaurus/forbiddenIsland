var HelicopterLiftCard = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = "Helicopter Lift Card";

  //SAMPLE card creation
  helicopterCardSquare = new PIXI.Graphics();
  helicopterCardText = new PIXI.Text("HelicopterLift", {font: '10px Arial'});
  helicopterCardSquare.beginFill(0xFFFFFF);
  helicopterCardSquare.lineStyle(5, 0x000000);
  helicopterCardSquare.drawRect(0, 0, 70, 90);
  helicopterCardText.position.x = this.position.x + 15;
  helicopterCardText.position.y = this.position.y + 5;
  helicopterCardSquare.interactive = true;
  helicopterCardSquare.hitArea = helicopterCardSquare.getBounds();

  this.addChild(helicopterCardSquare);
  this.addChild(helicopterCardText);

  helicopterCardSquare.mousedown = helicopterCardSquare.touchstart = function(data) {
    $('body').trigger('cardClick', [this.type]);
  };

};


HelicopterLiftCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
//HelicopterLiftCard.constructor = HelicopterLiftCard;
