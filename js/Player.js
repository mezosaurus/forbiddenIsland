function Player (sprite, hand, role, index) {
	this.x = 0;
	this.y = 0;
    this.moveTarget = this;
    this.giveTarget = null;
    sprite.index = index;
    this.index = index;
	this.sprite = sprite;
	this.hand = hand;
	this.role = role;
	this.validMoveTiles = [];
    this.validShoreTiles = [];
    this.validGiveTargets = [];
	while(this.validMoveTiles.push([]) < 6);
    while(this.validShoreTiles.push([]) < 6);
    while(this.validGiveTargets.push(false) < 4);
	
	this.validGiveTargets = [];
	this.abilityUsed = false;

    this.sprite.mousedown = this.sprite.touch = function(data){
        console.log(data);
        data.originalEvent.cancelBubble = true;
        $('body').trigger('pawnClick', [this.index]);
    }

	this.move = function (x, y) {
		this.x = x;
		this.y = y;
		this.calculateValidMoveTiles();
        this.calculateValidShoreTiles();
        this.calculateValidGiveTargets();
	}
    
    this.markMovable = function(xPos, yPos){
        if(xPos < 6 && xPos >= 0  & yPos < 6 && yPos >= 0){
            this.validMoveTiles[xPos][yPos] = gameBoard[xPos][yPos].state !== "sunk";
        }
    }

    this.markShorable = function (xPos, yPos){
        if(xPos < 6 && xPos >= 0  & yPos < 6 && yPos >= 0){
            this.validShoreTiles[xPos][yPos] = gameBoard[xPos][yPos].state === "flooded";
        }
    }

    this.markGivable = function (index){
        if(index < validGiveTargets.length){
            this.validGiveTargets[index] = true;
        }
    }

	this.initValidActionTiles = function() {
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 6; j++) {
				this.validMoveTiles[i][j] = false;
			}
		}
	}

    this.initValidShoreTiles = function() {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                this.validShoreTiles[i][j] = false;
            }
        }
    }
    
    this.findClosest = function(direction){
        deltaX = 0;
        deltaY = 0;
        var found = false;
        if(direction === "up"){
            deltaY = -1;
        }else if(direction === "down"){
            deltaY = 1;
        }else if(direction === "left"){
            deltaX = -1;
        }else if(direction === "right"){
            deltaX = 1;
        }
        var xPos = this.x + deltaX;
        var yPos = this.y + deltaY;
        
        while(xPos < 6 && xPos >= 0  & yPos < 6 && yPos >= 0 && !found){
            if(gameBoard[xPos][yPos].state !== "sunk"){
                found = true;
            }else{
                xPos += deltaX;
                yPos += deltaY;
            }
        }
        if(found){
            if(direction === "up" || direction === "down")
                return yPos;
            if(direction === "right" || direction === "left")
                return xPos;
        }
        return -1;
    }

    this.calculateValidShoreTiles = function() {
        this.initValidShoreTiles();
        var xleft = this.x - 1;
        var xright = this.x +1;
        var yup = this.y - 1;
        var ydown = this.y + 1;

        this.markShorable(xleft, this.y);
        this.markShorable(xright, this.y);
        this.markShorable(this.x, yup);
        this.markShorable(this.x, ydown);
        this.markShorable(this.x, this.y);

        if(this.role == "Explorer"){
            this.markShorable(xright, yup);
            this.markShorable(xright, ydown);
            this.markShorable(xleft, yup);
            this.markShorable(xleft, ydown);
        }
    }

	this.calculateValidMoveTiles = function() {
        this.initValidActionTiles();
        var xleft = this.x - 1;
        var xright = this.x +1;
        var yup = this.y - 1;
        var ydown = this.y + 1;
        
        this.markMovable(xleft, this.y);
        this.markMovable(xright, this.y);
        this.markMovable(this.x, yup);
        this.markMovable(this.x, ydown);
        
		if (this.role == "Pilot" && !this.abilityUsed) {
			for (var i = 0; i < 6; i++) {
				for (var j = 0; j < 6; j++) {
                   this.markMovable(i, j);
				}
			}
		}
		else if (this.role == "Explorer") {
            this.markMovable(xright, yup);
            this.markMovable(xright, ydown);
            this.markMovable(xleft, yup);
            this.markMovable(xleft, ydown);
		}
		else if (this.role == "Diver") {
            var up = this.findClosest("up");
            var down = this.findClosest("down");
            var left = this.findClosest("left");
            var right = this.findClosest("right");
            
            this.markMovable(this.x, up);
            this.markMovable(this.x, down);
            this.markMovable(right, this.y);
            this.markMovable(left, this.y);
		}
	}

    this.calculateValidGiveTargets = function(){
        //initialize to false;
        for(var i = 0; i < this.validGiveTargets.length; i++){
            this.validGiveTargets[i] = false;
        }
        for(var i = 0; i < players.length; i++){
            var player = players[i];
            console.log(role + ": " + i);
            console.log(player);
            if(this.index !== i && ((this.x == player.x && this.y == player.y) || this.role == "Messenger")){
               this.validGiveTargets[i] = true;
            }
        }

    }

	this.initValidActionTiles();
    this.initValidShoreTiles();
}