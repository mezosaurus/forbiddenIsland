var CupcakeCard = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = 0;

  //Cupcake treasure card creation
  treasureCardSquare = new PIXI.Graphics();
  treasureCardSquare.beginFill(0xFFFFFF);
  treasureCardSquare.lineStyle(5, 0x000000);
  treasureCardSquare.drawRect(0, 0, 64, 64);
  treasureCardSquare.interactive = true;
  treasureCardSquare.hitArea = treasureCardSquare.getBounds();

  var cupcakeTexture = PIXI.Texture.fromImage("img/cupcake.png");
  var cupcakeSprite = new PIXI.Sprite(cupcakeTexture);
  cupcakeSprite.position.x = 35;
  cupcakeSprite.position.y = 30;
  cupcakeSprite.anchor.x = 0.5;
  cupcakeSprite.anchor.y = 0.5;
  cupcakeSprite.scale.x = 0.7;
  cupcakeSprite.scale.y = 0.7;
  this.addChild(treasureCardSquare);
  this.addChild(cupcakeSprite);

  var me = this;
  treasureCardSquare.mousedown = treasureCardSquare.touchstart = function(data) {
    $('body').trigger('cardClick', [me]);
  };
};

CupcakeCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
CupcakeCard.constructor = CupcakeCard;
