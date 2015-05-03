/*
* Authors: Ethan Hayes, Devon Winkler, Logan Gore, Colton Lillywhite
* Game Manager functions to handle game events
*/

function tileClickListener(x, y, name, which) {
	if (which == 1) {
		// Left mouse event
		var tile = gameBoard[x][y];
		var player = players[turn].moveTarget;
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
			console.log(tile.state);
			console.log(player.validShoreTiles[x][y]);
			if(player.validShoreTiles[x][y]){
				console.log('here');
				tile.flip();
				player.calculateValidShoreTiles();
			}
		}
	}
	// Get current player turn

}

function treasureClickListener(type, which) {
    var treasure = treasures[type];
    checkTreasures()//TODO do this elsewhere

    if (treasure.state === 'obtainable') {
        treasure.state = 'obtaining';
    }
}

//TODO call this at beginning of player turn and after every move
function checkTreasures() {
    for (var type = 0; type < 3; type++) {
        var count = 0;
        for (var j = 0; j < p1.hand.hand.length; j++) {
            //TODO only check the active player
            if (p1.hand.hand[j].type == type) {
                count++;
            }
        }

        if (count >= 4) {
            if (treasures[type].state === 'available') {
                treasures[type].state = 'obtainable';
            }
        }
    }
}

function pawnClickListener(index){
	var player = players[turn];
	if(actionMode == "give"){
		if(player.validGiveTargets[index]){
			console.log("validGiveTarget");
		}else{
			console.log("invalidGiveTarget");
		}
	}else if(actionMode == "choose"){
		if(player.role == "Navigator"){
			player.moveTarget.sprite.unhighlight();
			player.moveTarget = players[index];
			player.moveTarget.sprite.highlight();
		}
	}
}

function cardClickListener(type) {
	alert(type);
}

function shuffleCards(cards) {
	var length = cards.length - 1;
	var swap;
	var temp;
	for (i = length; i > 0; i--) {
	    swap = Math.floor(Math.random() * i);
	    temp = cards[i];
	    cards[i] = cards[swap];
	    cards[swap] = temp;
	}

	return cards;
}
