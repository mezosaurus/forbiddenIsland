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
        this.state = 'sinking';
        this.buttonMode = false;
        this.interactive = false;
        var myPlayers = this.children;
        for(var i = 0; i < myPlayers.length; i++){
            var player = players[myPlayers[i].index];
            player.calculateValidMoveTiles(player.x, player.y, player.validMoveTiles);
            for(var col = 0; col < 6; col++){
                for(var row = 0; row<6; row++){
                    if(player.validMoveTiles[col][row]){

                    }    
                }
            }
        }
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
            if(this.alpha > 0){
                this.alpha -= .01;
            }
            else{
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
