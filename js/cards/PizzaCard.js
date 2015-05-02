var PizzaCard = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = 1;

  //Pizza treasure card creation
  treasureCardSquare = new PIXI.Graphics();
  treasureCardSquare.beginFill(0xFFFFFF);
  treasureCardSquare.lineStyle(5, 0x000000);
  treasureCardSquare.drawRect(0, 0, 64, 64);
  treasureCardSquare.interactive = true;
  treasureCardSquare.hitArea = treasureCardSquare.getBounds();

  var pizzaTexture = PIXI.Texture.fromImage("img/pizza.png");
  var pizzaSprite = new PIXI.Sprite(pizzaTexture);
  pizzaSprite.position.x = 35;
  pizzaSprite.position.y = 30;
  pizzaSprite.anchor.x = 0.5;
  pizzaSprite.anchor.y = 0.5;
  pizzaSprite.scale.x = 0.7;
  pizzaSprite.scale.y = 0.7;

  this.addChild(treasureCardSquare);
  this.addChild(pizzaSprite);

  var type = this.type;
  treasureCardSquare.mousedown = treasureCardSquare.touchstart = function(data) {
    $('body').trigger('cardClick', [type]);
  };
};

PizzaCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
