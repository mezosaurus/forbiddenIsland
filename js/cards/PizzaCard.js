var PizzaCard = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.type = "Donut";

  //SAMPLE card creation
  treasureCardSquare = new PIXI.Graphics();
  treasureCardSquare.beginFill(0xFFFFFF);
  treasureCardSquare.lineStyle(5, 0x000000);
  treasureCardSquare.drawRect(0, 0, 64, 64);
  treasureCardSquare.interactive = true;
  treasureCardSquare.hitArea = treasureCardSquare.getBounds();


  // draw a diamond (a square rotated to stand on one corner).
  var diamond = new PIXI.Graphics();
  diamond.lineStyle(0, 0xFFFF66);
  diamond.beginFill(0xFFFF66);
  diamond.drawRect(0, 0, 50, 50);
      // This defines the center.
  diamond.position.x = this.position.x + 5;
  diamond.position.y = this.position.y + 70;
      // This says to pivot around the center.
  diamond.pivot = new PIXI.Point(this.position.x, this.position.y);
      // This rotates the square 45 degrees, so that it becomes a diamond standing on its point.
  diamond.rotation = 62.05;

  var pizzaTexture = PIXI.Texture.fromImage("img/pizza.png");
  var pizzaSprite = new PIXI.Sprite(cupcakeTexture);
  pizzaSprite.position.x = 35;
  pizzaSprite.position.y = 30;
  pizzaSprite.anchor.x = 0.5;
  pizzaSprite.anchor.y = 0.5;
  pizzaSprite.scale.x = 0.7;
  pizzaSprite.scale.y = 0.7;

  this.addChild(treasureCardSquare);
  this.addChild(pizzaSprite);

  treasureCardSquare.mousedown = treasureCardSquare.touchstart = function(data) {
    $('body').trigger('cardClick', [this.type]);
  };
};

PizzaCard.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PizzaCard.constructor = TreasureCard;
