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
			
		}
		else if (actionMode == "shore") {
			tile.flip();
		}
	}
	// Get current player turn

}

function cardClickListener() {

}
