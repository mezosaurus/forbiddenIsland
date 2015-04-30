var HelicopterLiftCard = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = "HelicopterLift";

  //Helicopter card creation
  helicopterCardSquare = new PIXI.Graphics();
  helicopterCardText = new PIXI.Text("Helicopter\nLift", {font: '10px Arial'});
  helicopterCardSquare.beginFill(0xFFFFFF);
  helicopterCardSquare.lineStyle(5, 0x000000);
  helicopterCardSquare.drawRect(0, 0, 64, 64);
  helicopterCardText.position.x = this.position.x + 15;
  helicopterCardText.position.y = this.position.y + 5;
  helicopterCardSquare.interactive = true;
  helicopterCardSquare.hitArea = helicopterCardSquare.getBounds();

  this.addChild(helicopterCardSquare);
  this.addChild(helicopterCardText);

  var type = this.type;
  helicopterCardSquare.mousedown = helicopterCardSquare.touchstart = function(data) {
    $('body').trigger('cardClick', [type]);
  };

};


HelicopterLiftCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
HelicopterLiftCard.constructor = HelicopterLiftCard;
