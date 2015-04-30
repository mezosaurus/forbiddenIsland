/*
 * PlayerHand class for representing PlayerHand hands
 */
var PlayerHand = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.hand = [];

  this.addCard = function(card) {
    if (this.hand.length < 5)
    {
      //Make sure the cards appear in a row and not ontop of each other
      if (this.hand.length > 0)
      {
        card.position.x += this.hand.length * 80;
      }

      this.hand.push(card);
      this.addChild(card);
    }
  };

  this.discardCard = function(card) {
    //Search the entire array for the card
    for (var i =0; i < this.hand.length; i++) {
       if (this.hand[i].type === card.type) {
          someArray.splice(i,1);
          this.removeChild(card);
          break;
       }
    }
  };

  this.hasCard = function(card) {
    //Search the entire array for the card
    var contains = false;

    for (var i =0; i < this.hand.length; i++) {
       if (this.hand[i].type === card.type) {
          contains = true;
          break;
       }
    }
    return contains;
  };

};

PlayerHand.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PlayerHand.constructor = PlayerHand;
