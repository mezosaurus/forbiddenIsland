
$(document).ready(function() {
	startGame();
	//createRoleSelects();
});

function startGame() {
	$("#myModal").modal('show');
	createRoleSelects();

	$("#playerSelect").on('change', function() {
		numPlayers = this.value;
		// Get how many player selects there currently are
		var numSelects = $("#roleSelectDiv > select").length;
		// Get difference between numPlayers selected and numSelects
		var diff = numPlayers - numSelects;

		// If diff is negative, remove select(s)
		if (diff < 0) {
			diff = Math.abs(diff);
			var temp = numSelects;
			for (var i = 0; i < diff; i++) {
				$("#selectLabel"+temp).remove();
				$("#roleSelect"+temp).remove();
				temp--;
			}
		}
		// If diff is positive, add select(s)
		else {
			var temp = numSelects+1;
			for (var i = 0; i < diff; i++) {
				//var roleSelect = "<br/>";
				var roleSelect = "<p id='selectLabel"+temp+"'>Player "+temp+"</p>";
				roleSelect += "<select id='roleSelect"+temp+"' class='form-control'>";
				for (var j = 0; j < roles.length; j++) {
					roleSelect += "<option value="+roles[j]+">"+roles[j]+"</option>";
				}
				roleSelect += "</select>";
				roleSelect += "</div>";
				roleSelect += "</div>";
				$("#roleSelectDiv").append(roleSelect);
				temp++;
			}
		}
	});

	$("#startGameBtn").on('click', function() {
		// Reset water level

		var numPlayers = $("#roleSelectDiv > select").length;
		// See if there is more than one player
		// If there is, make sure all the roles are different
		var selectedRoles = [];
		for (var i = 1; i <= numPlayers; i++) {
			selectedRoles.push($("#roleSelect"+i).val());
		}
		var sameRoles = false;
		// Sort roles array
		selectedRoles.sort();
		for (var i = 0; i < selectedRoles.length - 1; i++) {
			if(selectedRoles[i+1] == selectedRoles[i]) {
				sameRoles = true;
			}
		}
		if (sameRoles) {
			// Display message saying unique roles required
			$("#messageArea").show();
		}
		else {
			
			var anchorX = 0;
			var anchorY = 0;
			// Create players and add to player area
			for (var i = 1; i <= numPlayers; i++) {
				players.push(createPlayer($("#roleSelect"+i).val(), anchorX, anchorY, i));
				if (anchorY == 1) {
					var temp = anchorX;
					anchorX = anchorY;
					anchorY = temp;
				}
				else {
					anchorY++;
				}
			}
			drawPlayerPositions();
			drawPlayerHands(stage);
            drawActionCounter(stage);
			gameStarted = true;
			$("#myModal").modal("hide");
			
			// Start turn
			startTurn(turn);
		}
	});
}

function createPlayer(role, anchorX, anchorY, index) {
	var player = new Player(new PlayerPawn(new PIXI.Texture.fromImage(pawnTextures[role]), new PIXI.Texture.fromImage(pawnHighlightTextures[role]), anchorX, anchorY), new PlayerHand(), role, index - 1);
	return player;
}

function createRoleSelects() {
	for (var i = 1; i <= 2; i++) {
		var roleSelect = "<p id='selectLabel"+i+"'>Player "+i+"</p>";
		roleSelect += "<select id='roleSelect"+i+"' class='form-control'>";
		for (var j = 0; j < roles.length; j++) {
			roleSelect += "<option value="+roles[j]+">"+roles[j]+"</option>";
		}
		roleSelect += "</select>";
		roleSelect += "</div>";
		roleSelect += "</div>";
		$("#roleSelectDiv").append(roleSelect);
	}
}