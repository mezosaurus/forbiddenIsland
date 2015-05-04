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
var roleColors = {
		"Diver": "0x000000",
		"Explorer": "0x00ff00",
		"Navigator" : "0xffff00",
		"Pilot" : "0x0000ff",
		"Engineer" : "0xff0000",
		"Messenger": "0x606060"
	};
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
var discardedFloodCards = [];
var discardedTreasureCards = [];
var treasureDeckClicked = false;
// GAME BOARD
var gameBoard = [];
// Init empty 6x6 2D Array
while(gameBoard.push([]) < 6);
var helipadX = -1;
var helipadY = -1;
// WATER LEVEL
var waterLevel = 0;
var waterLevels = [2,2,3,3,3,4,4,5,5,"death"];
// discard mode variables
var tempMode = "discard";
var actionCard;
var holdCard1;
var holdCard2;
var holdCards = false;
var helicopterPlayers = [];

var initFloodTiles = true;