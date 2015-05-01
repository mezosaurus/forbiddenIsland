var numPlayers = 1;
var roles = ["Diver", "Explorer", "Navigator", "Pilot", "Engineer", "Messenger"];
var gameStarted = false;
$(document).ready(function() {
	$("#myModal").modal('show');

	$("#playerSelect").on('change', function() {
		console.log('player select change');
		numPlayers = this.value;
		console.log('numPlayers: ' + numPlayers);
		// Get how many player selects there currently are
		var numSelects = $("#roleSelectDiv > select").length;
		console.log('numSelects: ' + numSelects);
		// Get difference between numPlayers selected and numSelects
		var diff = numPlayers - numSelects;
		console.log('diff : ' + diff);

		// If diff is negative, remove select(s)
		if (diff < 0) {
			diff = Math.abs(diff);
			var temp = numSelects;
			for (var i = 0; i < diff; i++) {
				console.log('removing at id: ' +temp);
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
		var numPlayers = $("#roleSelectDiv > select").length;
		// See if there is more than one player
		// If there is, make sure all the roles are different
		var selectedRoles = [];
		for (var i = 1; i <= numPlayers; i++) {
			console.log("pushing: " + $("#roleSelect"+i).val());
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
			$("#myModal").hide();
			gameStarted = true;
		}
	});
});