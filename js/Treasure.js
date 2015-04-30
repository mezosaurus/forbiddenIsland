function Treasure(normalTexture, obtainableTexture, obtainedTexture, treasureType){
    PIXI.Sprite.call(this, normalTexture);
    this.normal = normalTexture;
    this.obtainable = obtainableTexture;
    this.obtained = obtainedTexture;
    this.type = treasureType;
    this.state = 'available';
    this.buttonMode = true;
    this.interactive = true;
    this.tint = 0xffffff;
    this.alpha = 1;
    this.position.x = 0;
    this.position.y = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    
    this.mousedown = this.touchstart = function(data){
        var eventWhich = data.originalEvent.which;
        $('body').trigger('treasureClick', [this.type, eventWhich]);
    }
    
    this.takeTreasure = function(){
        this.state = 'obtaining';
    }
    
    this.animate = function(){
        if(this.state === 'obtaining'){
            if(this.width > 0){
                this.width -= 10;
            }
            else{
                this.state = 'obtained';
                this.setTexture(this.obtained);
            }
        }
        else if(this.state === 'obtained' && this.width < this.obtained.width){	
            this.width += 10;
        }
    }
}
Treasure.constructor = Treasure;
Treasure.prototype = Object.create(PIXI.Sprite.prototype);