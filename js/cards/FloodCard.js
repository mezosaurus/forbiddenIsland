var FloodCard = function(row, column) {
  PIXI.DisplayObjectContainer.call(this);
  this.type = "Flood";
  this.row = row;
  this.column = column;

  //Flood card creation
  floodCardSquare = new PIXI.Graphics();
  floodCardText = new PIXI.Text(this.column + ', ' + this.row, {font: '10px Arial'});
  floodCardSquare.beginFill(0xFFFFFF);
  floodCardSquare.lineStyle(5, 0x000000);
  floodCardSquare.drawRect(0, 0, 64, 64);
  floodCardText.position.x = this.position.x + 15;
  floodCardText.position.y = this.position.y + 5;
  floodCardSquare.interactive = true;
  floodCardSquare.hitArea = floodCardSquare.getBounds();

  this.addChild(floodCardSquare);
  this.addChild(floodCardText);

  // floodCardSquare.mousedown = floodCardSquare.touchstart = function(data) {
  //   $('body').trigger('cardClick', [this.type]);
  // };

};


FloodCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
FloodCard.constructor = FloodCard;
