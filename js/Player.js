/*
 * Player class for representing player hands
 */
var Player = function(name, role) {
  PIXI.DisplayObjectContainer.call(this);
  this.role = role;
  this.name = name;
  this.hand = [];

  this.addCard = function(card) {
    if (this.hand.length < 5)
    {
      //Make sure the cards appear in a row and not ontop of each other
      if (this.hand.length > 0)
      {
        card.position.x += this.hand.length * 100;
      }

      this.hand.push(card);
      this.addChild(card);
    }
  };

  this.discardCard = function(card) {
    //Search the entire array for the card
    for (var i =0; i < this.hand.length; i++)
     if (this.hand[i].type === card.type) {
        someArray.splice(i,1);
        this.removeChild(card);
        break;
     }
  };
};

Player.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Player.constructor = Player;
