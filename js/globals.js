/** GLOBAL VARS **/
//var players = [];
var treasures = [];
var actionMode = "move";
var numPlayers = 2;
var roles = ["Diver", "Explorer", "Navigator", "Pilot", "Engineer", "Messenger"];
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

// Turn - integer for each player
var turn = 0;
var height = 610;
var width = 1280;
var treasureCards = [];
// GAME BOARD
var gameBoard = [];
