function Player (x, y, sprite, hand, role) {
	this.x = x;
	this.y = y;
	this.sprite = sprite;
	this.hand = hand;
	this.role = role;
	this.validActionTiles = [];
	while(this.validActionTiles.push([]) < 6);
	
	this.validGiveTargets = [];
	this.abilityUsed = false;

	this.move = function (x, y) {
		this.x = x;
		this.y = y;
		this.calculateValidActionTiles();
	}

	this.calculateValidActionTiles = function() {
		if (this.role == "Pilot" && !abilityUsed) {
			for (var i = 0; i < 6; i++) {
				for (var j = 0; j < 6; j++) {
					this.validActionTiles[i][j] = true;
				}
			}
		}
		else if (this.role == "Explorer") {

		}
		else if (this.role == "Diver") {

		}
		else {

		}
	}

	this.initValidActionTiles = function() {
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 6; j++) {
				this.validActionTiles[i][j] = false;
			}
		}
	}

	this.initValidActionTiles();
}