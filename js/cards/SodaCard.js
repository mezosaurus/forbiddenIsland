var SodaCard = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = "Soda";

  //SAMPLE card creation
  treasureCardSquare = new PIXI.Graphics();
  treasureCardSquare.beginFill(0xFFFFFF);
  treasureCardSquare.lineStyle(5, 0x000000);
  treasureCardSquare.drawRect(0, 0, 70, 90);

  treasureCardSquare.interactive = true;
  treasureCardSquare.hitArea = treasureCardSquare.getBounds();

  var sodaTexture = PIXI.Texture.fromImage("img/soda.png");
  var sodaSprite = new PIXI.Sprite(cupcakeTexture);
  sodaSprite.position.x = 35;
  sodaSprite.position.y = 30;
  sodaSprite.anchor.x = 0.5;
  sodaSprite.anchor.y = 0.5;
  sodaSprite.scale.x = 0.7;
  sodaSprite.scale.y = 0.7;
  this.addChild(treasureCardSquare);
  this.addChild(sodaSprite);

  var type = this.type;
  treasureCardSquare.mousedown = treasureCardSquare.touchstart = function(data) {
    $('body').trigger('cardClick', [type]);
  };
};

SodaCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
SodaCard.constructor = TreasureCard;
