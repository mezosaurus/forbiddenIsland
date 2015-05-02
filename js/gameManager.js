/*
* Authors: Ethan Hayes, Devon Winkler, Logan Gore, Colton Lillywhite
* Game Manager functions to handle game events
*/

$(function(){
  // Turn start OK button listener
  $("#turnModalStartBtn").on("click", function() {
    $("#turnModal").modal("hide");
    // set focus to move button in the action mode button group
    document.getElementById("move").focus();
  });
});

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
                handleTurnEvent();
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
			player.moveTarget = players[index];
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

function startTurn(playerNum) {
  // Allocate 3 turn actions
  turnActions = 3;
  var turnModal = $("#turnModal");
  var turnModalTitle = $("#turnModalTitle");
  var turnModalContent = $("turnModalContent");
  var player = players[playerNum];
  var currentPlayer = playerNum+1;

  // Set the modal title for whichever player's turn it is
  turnModalTitle.text("Player " + currentPlayer + "'s Turn");
  turnModal.modal("show");

  // Set the role information content
  var roleInfoHeader = $("#roleInfoHeader");
  roleInfoHeader.text(player.role);
  setRoleContent(player.role);
}

function setRoleContent(role) {
	var roleInfoContent = $("#roleInfoContent");
	for (var i = 0; i < roles.length; i++) {
		if (role == roles[i]) {
			roleInfoContent.text(roleInfoText[i]);
		}
	}
}

function handleTurnEvent() {
	// decrement turn actions counter
    turnActions--;
    // End turn if no actions left
    if (turnActions == 0) {
    	endTurn();
    }
}

function endTurn() {
	// increment turn variable depending upon number of players
	var maxTurn = numPlayers - 1;
	turn++;
	if (turn > maxTurn) {
		turn = 0;
	}
	// Start next turn
	startTurn(turn);
}
