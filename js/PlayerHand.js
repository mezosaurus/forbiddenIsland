/*
 * PlayerHand class for representing PlayerHand hands
 */
var PlayerHand = function() {
  PIXI.DisplayObjectContainer.call(this);
  this.hand = [null, null, null, null, null];
  this.cardCount = 0;

  this.addCard = function(card) {
    for (var i = 0; i < this.hand.length; i++) {
      if (this.hand[i] == null) {
        card.position.x = i*80;
        card.position.y = 0;
        this.hand[i] = card;
        this.cardCount++;
        this.addChild(card);
        break;
      }
    }
  };

  this.discardCard = function(card) {
    //Search the entire array for the card
    for (var i =0; i < this.hand.length; i++) {
       if (this.hand[i] && this.hand[i].type === card.type) {
          //this.hand.splice(i,1);
          this.hand[i] = null;
          this.cardCount--;
          this.removeChild(card);
          break;
       }
    }
  };

  this.hasCard = function(card) {
    //Search the entire array for the card
    var contains = false;

    for (var i =0; i < this.hand.length; i++) {
       if (this.hand[i] && this.hand[i].type === card.type) {
          contains = true;
          break;
       }
    }
    return contains;
  };

};

PlayerHand.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PlayerHand.constructor = PlayerHand;
