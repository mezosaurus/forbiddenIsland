/*
* Authors: Ethan Hayes, Devon Winkler, Logan Gore, Colton Lillywhite
* Game Manager functions to handle game events
*/

function tileClickListener(x, y, name, which) {
	if (which == 1) {
		// Left mouse event
		var tile = gameBoard[x][y];
		tile.flip();
	}
	// Get current player turn

	// 
}

function cardClickListener() {

}
