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
		var player = players[turn];
		var moveTarget = players[turn].moveTarget;
		var playerTile = gameBoard[player.x][player.y];
		// Handle actions for each mode
		if (actionMode == "move") {
			var validTiles;
			console.log(player.role);
			console.log(player.moveTarget.role);
			console.log(player.moveTarget);
			if(player.role === moveTarget.role){
				console.log("my role is the same as my move target");
				validTiles = player.validMoveTiles;
			}else
			{
				validTiles = player.moveTarget.validNavigatorTiles;
			}
			console.log(validTiles);
			if(validTiles[x][y]){
                moveTarget.move(x, y);
                playerTile.removeChild(moveTarget.sprite)
                tile.addChild(moveTarget.sprite);
                checkTreasures();
            }
		}
		else if (actionMode == "shore") {
			if(player.validShoreTiles[x][y]){
				// If not engineer, decrement actions
				if (player.role == "Engineer") {
					if (player.engineerShoreCount == 0) {
						player.engineerShoreCount = 2;
						handleTurnEvent();
					}
					else
						player.engineerShoreCount--;
				}
				else {
					handleTurnEvent();
				}
				tile.flip();
				player.calculateValidShoreTiles();
			}
		}
	}
	// Get current player turn

}

function treasureClickListener(type, which) {
    var treasure = treasures[type];

    if (treasure.state === 'obtainable') {
        treasure.state = 'obtaining';
    }
}

function checkTreasures() {
    resetTreasures();
    
    for (var type = 0; type < 3; type++) {
        var count = 0;
        for (var j = 0; j < players[turn].hand.hand.length; j++) {
            if (players[turn].hand.hand[j].type == type) {
                count++;
            }
        }

        if (count >= 4 && gameBoard[players[turn].x][players[turn].y].treasureType == type) {
            if (treasures[type].state === 'available') {
                treasures[type].state = 'obtainable';
            }
        }
    }
}

function resetTreasures() {
    for (var type = 0; type<3; type++) {
        if (treasures[type].state === 'obtainable') {
            treasures[type].state = 'available';
        }
    }
}

function pawnClickListener(index){
	var player = players[turn];
	var card = player.giveTarget;
	if(actionMode == "give"){
		if(player.validGiveTargets[index]){
			if(card !== null){
				var otherPlayer = players[index];
				otherPlayer.hand.addCard(card);
				player.hand.discardCard(card);
			}
			console.log("validGiveTarget");
		}
	}else if(actionMode == "choose"){
		if(player.role == "Navigator"){
			player.moveTarget.sprite.unhighlight();
			console.log(players[index]);
			player.moveTarget = players[index];
			player.moveTarget.sprite.highlight();
		}
	}
}

function cardClickListener(card) {
	var player = players[turn];
	if(actionMode == "give"){
		player.giveTarget = card;
	}
}

function shuffleCards(cards) {
  if (cards.length <= 0)
    return;
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
  // Calculate valid move tiles
  player.initValidActionTiles();
  player.calculateValidMoveTiles(player.x, player.y, player.validMoveTiles);
  player.calculateValidNavigatorTiles();
  // Calculate valid shore tiles
  player.calculateValidShoreTiles();
  // Calculate valid give targets
  player.calculateValidGiveTargets();
  // Highlight player pawn
  player.moveTarget.sprite.highlight();
  var currentPlayer = playerNum+1;

  // Set the modal title for whichever player's turn it is
  turnModalTitle.text("Player " + currentPlayer + "'s Turn");
  turnModal.modal("show");

  // Set the role information content
  var roleInfoHeader = $("#roleInfoHeader");
  roleInfoHeader.text(player.role);
  setRoleContent(player.role);
  
  checkTreasures();
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
    resetTreasures();
    
	// increment turn variable depending upon number of players
	var maxTurn = numPlayers - 1;
	turn++;
	if (turn > maxTurn) {
		turn = 0;
	}
	// Start next turn
	startTurn(turn);
}
