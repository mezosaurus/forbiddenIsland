/*
* Authors: Ethan Hayes, Devon Winkler, Logan Gore, Colton Lillywhite
* Game Manager functions to handle game events
*/

$(function(){
  // Turn start button listener
  $("#turnModalStartBtn").on("click", function() {
    $("#turnModal").modal("hide");
    // set focus to move button in the action mode button group
    actionMode = "move";
    document.getElementById("move").focus();
  });
  // Water rise ok button click event
  $("#waterRiseOkBtn").on("click", function() {
  	$("#waterRiseModal").modal("hide");
  });
  // Water rise modal hide event
  $("#waterRiseModal").on("hide.bs.modal", function() {
  	if (waterLevels[waterLevel] != "death")
    {
      currentWaterLine.position.y = currentWaterLine.position.y - 30;
      waterLevel++;

      if (discardedFloodCards.length !== 0)
      {
        discardedFloodCards = shuffleCards(discardedFloodCards);
        floodCards = [].concat(floodCards, discardedFloodCards);
        discardedFloodCards = [];
      }
    }

    if (waterLevels[waterLevel] == "death")
    {
    	// show game over modal
    	$("#endGameModal").modal("show");
    }
  });

  // End game button click event
  $("#newGameBtn").on("click", function() {
  	$("#endGameModal").modal("hide");
    location.reload();
  	//startGame();
  });
  
  // End game button click event
  $("#newGameBtnwin").on("click", function() {
    $("#winGameModal").modal("hide");
    location.reload();
  	//startGame();
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
		if (actionMode == "move" && turnActions > 0) {
			var validTiles;
			if(player.role === moveTarget.role){
				validTiles = player.validMoveTiles;
			}else
			{
				validTiles = player.moveTarget.validNavigatorTiles;
			}
			if(validTiles[x][y]){
                moveTarget.move(x, y);
                handleTurnEvent();
                playerTile.removeChild(moveTarget.sprite)
                tile.addChild(moveTarget.sprite);
                checkTreasures();
            }
		}
		else if (actionMode == "shore" && turnActions > 0) {
			if(player.validShoreTiles[x][y]){
				// If not engineer, decrement actions
				if (player.role == "Engineer") {
					player.engineerShoreCount--;
					if (player.engineerShoreCount == 0) {
						player.engineerShoreCount = 2;
						handleTurnEvent();
					}
				}
				else {
					handleTurnEvent();
				}
				tile.flip();
				player.calculateValidShoreTiles();
			}
		}
        else if (actionMode == "sandbag") {
            if(tile.state === 'flooded'){
                tile.flip();
                actionMode = tempMode;
                actionCard.parent.discardCard( actionCard );
            }
        }
        else if (actionMode == "helicoptertile") {
            if(gameBoard[x][y].state !== 'sunk'){
                //TODO actually do some helicoptery stuff
                for (var i = 0; i < helicopterPlayers.length; i++) {
                    helicopterPlayers[i].move(x, y);
                    playerTile.removeChild(helicopterPlayers[i].sprite);
                    tile.addChild(moveTarget.sprite);
                    helicopterPlayers = [];
                    checkTreasures();
                }
                actionMode = tempMode;
                actionCard.parent.discardCard( actionCard );
            }
        }
	}

}

function treasureClickListener(type, which) {
    var treasure = treasures[type];

    if (treasure.state === 'obtainable') {
        treasure.state = 'obtaining';
    }
}

function checkTreasures() {
    resetTreasures();

    for (var type = 0; type < 4; type++) {
        var count = 0;
        for (var j = 0; j < players[turn].hand.hand.length; j++) {
        	var card = players[turn].hand.hand[j];
            if (card && card.type == type) {
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
    for (var type = 0; type < 4; type++) {
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
			if(card !== null && turnActions > 0){
				var otherPlayer = players[index];
				otherPlayer.hand.addCard(card);
				player.hand.discardCard(card);
				handleTurnEvent();
			}
		}
	} else if(actionMode == "choose"){
		if(player.role == "Navigator"){
			player.moveTarget.sprite.unhighlight();
			player.moveTarget = players[index];
			player.moveTarget.sprite.highlight();
		}
	} else if(actionMode === "helicopterpawn") {
        helicopterPlayers.push(players[index]);
        actionMode = "helicoptertile";//TODO add more players
    }
}

function cardClickListener(card) {
	var player = players[turn];
	if(actionMode == "give"){
		player.giveTarget = card;
	}
	else if (actionMode == "discard") {
		var player = players[turn];
		var hand = player.hand;
		if (hand.hasCard(card)) {
			if (holdCard1) {
				hand.discardCard(card);
				var temp = holdCard1;
				hand.addCard(temp);
				holdCard1 = null;
			}
			else if (holdCard2) {
				hand.discardCard(card);
				var temp = holdCard2;
				hand.addCard(temp);
				holdCard2 = null;
			}
		}
		else {
			discardedTreasureCards.push(card);
			stage.removeChild(card);
		}
		if (holdCard1 == null && holdCard2 == null) {
			holdCards = false;
			actionMode = tempMode;
		}
	}
    else if (card.type === 'Sandbag') {
        alert( "Select any flooded tile to shore up" );
        tempMode = actionMode;
        actionMode = "sandbag";
        actionCard = card;
    }
    else if (card.type === 'HelicopterLift') {
        var onExit = true;
        for (var p = 0; p < players.length; p++) {
            if (players[p].x != helipadX || players[p].y != helipadY) {
                onExit = false;
                break;
            }
        }
        
        var haveTreasures = true;
        for (var type = 0; type < 4; type++) {
            if (treasures[type].state != 'obtained') {
                haveTreasures = false;
                break;
            }
        }

        if (onExit == true && haveTreasures == true) {
            // show win modal
            $("#winGameModal").modal("show");
        }
        else {
            alert( "Select any player on the board and then select a tile to move them to" );
            tempMode = actionMode;
            actionMode = "helicopterpawn";
            actionCard = card;
        }
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
	if (!gameStarted)
		return;
  // Allocate 3 turn actions
  turnActions = 3;
  drawActionCounter();
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
  // Highlight valid move tiles
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
    drawActionCounter();
    // End turn if no actions left
    /*if (turnActions == 0) {
    	endTurn();
    }*/
}

function endTurn() {
    resetTreasures();

    var player = players[turn];
    if (player)
      player.moveTarget.sprite.unhighlight();

    treasureDeckClicked = false;
	// increment turn variable depending upon number of players
	var maxTurn = numPlayers - 1;
	turn++;
	if (turn > maxTurn) {
		turn = 0;
	}
    
	// Start next turn
	startTurn(turn);
}
