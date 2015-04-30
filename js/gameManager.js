/*
* Authors: Ethan Hayes, Devon Winkler, Logan Gore, Colton Lillywhite
* Game Manager functions to handle game events
*/

function tileClickListener(x, y, name, which) {
	if (which == 1) {
		// Left mouse event
		var tile = gameBoard[x][y];
		var player = players[turn];
		var playerTile = gameBoard[player.x][player.y];
		// Handle actions for each mode
		if (actionMode == "move") {
			if(player.validMoveTiles[x][y]){
                player.move(x, y);
                playerTile.removeChild(player.sprite)
                tile.addChild(player.sprite);
            }
		}
		else if (actionMode == "shore") {
			tile.flip();
		}
	}
	// Get current player turn

}

function treasureClickListener(type, which) {
    var treasure = treasures[type];
    checkTreasures()//TODO do this elsewhere
    
    if (treasure.state == 'obtainable')
        treasure.takeTreasure();
}

function checkTreasures() {
    for (var type = 0; type < 3; type++) {
        var count = 0;
        for (var j = 0; j < p1.hand.hand.length; j++) {
            //TODO only check the active player
            if (p1.hand.hand[j].type == type) {
                count++;
            }
        }
        
        if (count == 4) {
            treasures[type].state = 'obtainable';
        }
    }
}

function cardClickListener(type) {
	alert(type);
}
