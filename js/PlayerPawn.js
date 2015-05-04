function PlayerPawn(texture, highlight, anchorX, anchorY){
    PIXI.Sprite.call(this, texture);
    this.buttonMode = true;
    this.highlighted = highlight;
    this.unhighlighted = texture;
    this.interactive = true;
    this.state = "normal";
    this.tint = 0xffffff;
    this.anchor.x = anchorX;
    this.anchor.y = anchorY;
    this.alpha = 1;
    
    this.mousedown = this.touchstart = function(data){
        if(this.state === "normal"){
            this.state = "spinning";
        }else{
            this.state = "normal";
        }
    }

    this.highlight = function(){
        this.setTexture(this.highlighted);
    }

    this.unhighlight = function(){
        this.setTexture(this.unhighlighted);
    }
    
    this.animate = function(){
        if(this.state === "spinning"){
            this.rotation += 0.5;
        }
    }
}

PlayerPawn.constructor = PlayerPawn;
PlayerPawn.prototype = Object.create(PIXI.Sprite.prototype);