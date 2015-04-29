function PlayerPawn(texture, anchorX, anchorY){
    PIXI.Sprite.call(this, texture);
    this.buttonMode = true;
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
    
    this.animate = function(){
        if(this.state === "spinning"){
            this.rotation += 0.5;
        }
    }
}

PlayerPawn.constructor = PlayerPawn;
PlayerPawn.prototype = Object.create(PIXI.Sprite.prototype);