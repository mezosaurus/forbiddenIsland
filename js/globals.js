/** GLOBAL VARS **/
var treasures = [];
var actionMode = "move";
var numPlayers = 2;
var roles = ["Diver", "Explorer", "Navigator", "Pilot", "Engineer", "Messenger"];
var roleInfoText = ["Move through 1 or more adjacent flooded and/or missing tiles for 1 action. (Must end your turn on a tile)",
					"Move and/or shore up diagonally.",
					"Move another player up to 2 adjacent tiles for 1 action.",
					"Once per turn, fly to any tile on the island for 1 action.",
					"Shore up 2 tiles for 1 action.",
					"Give Treasure cards to a player anywhere on the island for 1 action per card."];
var roleColors = ["Black", "Green", "Yellow", "Blue", "Red", "Grey"];
var players = [];
var gameStarted = false;
var pawnTextures = {"Diver" : "img/pawns/black.png",
"Explorer": "img/pawns/green.png",
"Navigator": "img/pawns/yellow.png",
"Pilot": "img/pawns/blue.png",
"Engineer": "img/pawns/red.png",
"Messenger": "img/pawns/grey.png"}
var pawnHighlightTextures = {"Diver" : "img/pawns/black-highlight.png",
"Explorer": "img/pawns/green-highlight.png",
"Navigator": "img/pawns/yellow-highlight.png",
"Pilot": "img/pawns/blue-highlight.png",
"Engineer": "img/pawns/red-highlight.png",
"Messenger": "img/pawns/grey-highlight.png"}

// Turn - used to acces players array to know whose turn it is
var turn = 0;
// turn action counter
var turnActions = 3;

var height = 610;
var width = 1280;
var treasureCards = [];
var floodCards = [];
var discardedFloodCards = new Array();
// GAME BOARD
var gameBoard = [];
var helipadX = -1;
var helipadY = -1;
