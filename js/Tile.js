function Tile(normalTexture, floodedTexture, x, y, name){
    PIXI.Sprite.call(this, normalTexture);
    this.name = name;
    this.treasureType = -1;

    //possible tints for tiles
    this.flooded = 0x4985f3;
    this.normal = 0xffffff;
    this.highlight = 0x00ff00;
    this.currentTint = this.normal; //this is used as the tint to switch back to from flooded
    this.tint = this.currentTint;
    this.xIndex = x;
    this.yIndex = y;
    this.state = 'normal';
    this.buttonMode = true;
    this.interactive = true;
    this.position.x = 180+x*66;
    this.position.y = 130+y*66;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.alpha = 1;

    this.flip = function(){
        if(this.state === 'flooded'){
            this.state = 'shoring';
        }else if(this.state === 'normal'){
            this.state = 'flooding';
        }
    }

    this.mousedown = this.touchstart = function(data){
        var eventWhich = data.originalEvent.which;
        $('body').trigger('tileClick', [this.xIndex, this.yIndex, this.name, eventWhich]);
    }


    this.sink = function(){
        this.buttonMode = false;
        this.interactive = false;
        for(var i = 0; i < players.length; i++){
            var player = players[i];
            var newTile = null;
            console.log("Player: " + player.x + " " + player.y);
            console.log("Tile: " + this.xIndex + " " + this.yIndex);
            if(player.x == this.xIndex  && player.y == this.yIndex){
                console.log("I'm SINKING!!!");
                player.initValidActionTiles();
                player.calculateValidMoveTiles(player.x, player.y, player.validMoveTiles);
                for(var col = 0; col < 6; col++){
                    for(var row = 0; row<6; row++){
                        if(player.validMoveTiles[col][row]){
                            newTile = gameBoard[col][row];
                        }    
                    }
                }
                if(newTile == null){
                    $("#endGameModal").modal("show");
                }else{
                    console.log("found new tile");
                    player.move(newTile.xIndex, newTile.yIndex);
                    this.removeChild(player.sprite);
                    newTile.addChild(player.sprite);
                }
            }
        }

        if (helipadX === this.xIndex && helipadY === this.yIndex)
        {
          $("#endGameModal").modal("show");
          gameStarted = false;
        }
        if (this.treasureType > -1)
        {
          for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
              if ((gameBoard[i][j].treasureType === this.treasureType) &&
                gameBoard[i][j].state === "sunk")
              {
                  if (treasures[this.treasureType].state != "obtained")
                  {
                    $("#endGameModal").modal("show");
                    gameStarted = false;
                  }
              }
            }
          }
        }
        this.state = 'sinking';
    }

    this.highlight = function(){
        this.currentTint = this.highlight;
        this.tint = this.currentTint;
    }

    this.unhighlight = function(){
        this.currentTint = this.normal;
        this.tint = this.currentTint;
    }

    this.animate = function(){
        if(this.state === 'flooding'){
            if(this.width > 0){
                this.width -= 10;
            }
            else{
                this.state = 'flooded';
//                this.setTexture(this.flooded);
                this.tint = this.flooded;
            }

        }
        else if(this.state === 'shoring'){
            if(this.width > 0){
                this.width -= 10;
            }
            else{
                this.state = 'normal';
                this.tint = this.currentTint;
            }

        }
        else if(this.state === 'sinking'){
            if(this.alpha > .01){
                this.alpha -= .01;
            }
            else{
                this.alpha = 0;
                this.state = 'sunk';
            }
        }
        else if((this.state === 'normal' ||this.state === 'flooded') && this.width < this.texture.width){
            this.width += 10;
        }

    }
}
Tile.constructor = Tile;
Tile.prototype = Object.create(PIXI.Sprite.prototype);
