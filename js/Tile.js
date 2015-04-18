function Tile(x, y){
    this.x = x;
    this.y = y;
    this.state = 'normal';
    this.landTexture = PIXI.Texture.fromImage("img/tile.png");
    this.floodedTexture = PIXI.Texture.fromImage("img/floodTile.png");
    this.tileSprite = new PIXI.Sprite(landTexture);
    tileSprite.tint = 0xffffff;
    tileSprite.alpha = 1;
    tileSprite.position.x = 225+x*80;
    tileSprite.position.y = 225+y*80;
    tileSprite.anchor.x = 0.5;
    tileSprite.anchor.y = 0.5;
    tileSprite.tint = 0xffffff;
    tileSprite.alpha = 1;
    
    
    tileSprite.mousedown = tile.touchstart = function(data) {
        console.log('x: ' + this.x);
        console.log('y: ' + this.y);
        if (!(this.state === 'flooded' || this.state === 'flooding')) {
            this.state = 'flooding';
        }
        else {
            gameContainer.removeChild(this);

        }
    }
    
    function animate(){
        if(this.state = 'flooding';){
            if(tileSprite.width > 0){
                tileSprite.width -= 10;
            }
            else{
                this.state = 'flooded';
                tileSprite.setTexture(floodedTexture);
            }

        }		
        else if(tileSprite.width < floodedTexture.width){	
            tileSprite.width += 10;

        }
    }
}