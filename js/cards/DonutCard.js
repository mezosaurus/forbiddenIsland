var DonutCard = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = 4;

  //Donut treasure card creation
  treasureCardSquare = new PIXI.Graphics();
  treasureCardSquare.beginFill(0xFFFFFF);
  treasureCardSquare.lineStyle(5, 0x000000);
  treasureCardSquare.drawRect(0, 0, 64, 64);
  treasureCardSquare.interactive = true;
  treasureCardSquare.hitArea = treasureCardSquare.getBounds();

  var donutTexture = PIXI.Texture.fromImage("img/donut.png");
  var donutSprite = new PIXI.Sprite(donutTexture);
  donutSprite.position.x = 35;
  donutSprite.position.y = 30;
  donutSprite.anchor.x = 0.5;
  donutSprite.anchor.y = 0.5;
  donutSprite.scale.x = 0.7;
  donutSprite.scale.y = 0.7;


  this.addChild(treasureCardSquare);
  this.addChild(donutSprite);

  var type = this.type;
  treasureCardSquare.mousedown = treasureCardSquare.touchstart = function(data) {
    $('body').trigger('cardClick', [type]);
  };
};

DonutCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
DonutCard.constructor = TreasureCard;
