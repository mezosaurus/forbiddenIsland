var SandbagCard = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = "Sandbag";

  //Sangbag card creation
  sandbagCardSquare = new PIXI.Graphics();
  sandbagCardText = new PIXI.Text("Sand\nbag", {font: '10px Arial'});
  sandbagCardSquare.beginFill(0xFFFFFF);
  sandbagCardSquare.lineStyle(5, 0x000000);
  sandbagCardSquare.drawRect(0, 0, 64, 64);
  sandbagCardText.position.x = this.position.x + 15;
  sandbagCardText.position.y = this.position.y + 5;
  sandbagCardSquare.interactive = true;
  sandbagCardSquare.hitArea = sandbagCardSquare.getBounds();

  this.addChild(sandbagCardSquare);
  this.addChild(sandbagCardText);

  var me = this;
  sandbagCardSquare.mousedown = sandbagCardSquare.touchstart = function(data) {
    $('body').trigger('cardClick', [me]);
  };

};


SandbagCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
SandbagCard.constructor = SandbagCard;
