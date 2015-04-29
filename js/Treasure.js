function Treasure(normalTexture, obtainableTexture, obtainedTexture){
    PIXI.Sprite.call(this, normalTexture);
    this.normal = normalTexture;
    this.obtainable = obtainableTexture;
    this.obtained = obtainedTexture;
    this.state = 'normal';
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
        $('body').trigger('treasureClick', [eventWhich]);
    }
    
    this.highlight = function(){
        this.tint = 0x00ff00;
    }
    
    this.animate = function(){
    }
}
Treasure.constructor = Treasure;
Treasure.prototype = Object.create(PIXI.Sprite.prototype);