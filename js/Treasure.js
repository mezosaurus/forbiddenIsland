function Treasure(normalTexture, obtainableTexture, obtainedTexture, type){
    PIXI.Sprite.call( this, normalTexture );
    this.normal = normalTexture;
    this.obtainable = obtainableTexture;
    this.obtained = obtainedTexture;
    this.type = type;
    this.state = 'normal';
    this.buttonMode = true;
    this.interactive = true;
    this.tint = 0xffffff;
    this.alpha = 1;
    this.position.x = 225+type*80;
    this.position.y = 225+type*80;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    
    this.click = function(){
        if( this.state === 'obtainable' ){
            this.state = 'unobtainable';
        }
    }
    
    this.mousedown = this.touchstart = function(data){
        $('body').trigger('tileClick', [this.xIndex, this.yIndex, this.name]);
    }
    
    
    this.sink = function(){
        this.state = 'sinking';
        this.buttonMode = false;
        this.interactive - false;
    }
    
    this.highlight = function(){
        this.tint = 0x00ff00;
    }
    
    this.animate = function(){
        if(this.state === 'flooding'){
            if(this.width > 0){
                this.width -= 10;
            }
            else{
                this.state = 'flooded';
                this.setTexture(this.flooded);
            }

        }
        else if(this.state === 'shoring'){
            if(this.width > 0){
                this.width -= 10;
            }
            else{
                this.state = 'normal';
                this.setTexture(this.normal);
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
        else if(this.state === 'normal' && this.width < this.normal.width){	
            this.width += 10;
        }		
        else if(this.state === 'flooded' && this.width < this.flooded.width){	
            this.width += 10;
        }
        
    }
}
Tile.constructor = Tile;
Tile.prototype = Object.create(PIXI.Sprite.prototype);