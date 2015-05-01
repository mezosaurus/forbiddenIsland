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

// Turn - integer for each player
var turn = 3;
var height = 610;
var width = 1280;

// GAME BOARD
var gameBoard = [];