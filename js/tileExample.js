$(function(){
    $('body').on('tileClick', function(event, x, y, name){
        console.log('tileX: ', x);
        console.log('tileY: ', y);
        console.log('tileName: ', name);
    });
});

// pixi stage with grey background
var stage = new PIXI.Stage(0x888888);
// renderer instance with height 640 width 480
var renderer = PIXI.autoDetectRenderer(960, 960);
// empty container
var gameContainer = new PIXI.DisplayObjectContainer();
stage.addChild(gameContainer);
// add renderer view element to DOM
document.body.appendChild(renderer.view);

/* TILE GRID
*   xx
*  xxxx
* xxxxxx
* xxxxxx
*  xxxx
*   xx
*/

var texture = PIXI.Texture.fromImage("img/tile.png");
// Generate tile grid
for (var i = 0; i < 6; i++) {
	for (var j = 0; j < 6; j++) {
		// Skip tile positions on first row that need to be blank
		if ((i == 0 && j == 0) || (i == 0 && j == 1) || (i == 0 && j == 4) || (i == 0 && j == 5)) {
			continue;
		}
		// Skip tile positions on second row that need to be blank
		if ((i == 1 && j == 0) || (i == 1 && j == 5)) {
			continue;
		}
		// Skip tile positions on fifth row that need to be blank
		if ((i == 4 && j == 0) || (i == 4 && j == 5)) {
			continue;
		}
		// Skip tile positions on sixth row that need to be blank
		if ((i == 5 && j == 0) || (i == 5 && j == 1) || (i == 5 && j == 4) || (i == 5 && j == 5)) {
			continue;
		}
		var tile = new Tile(texture, texture, i, j, 'tile_' + i + '_' + j);
		gameContainer.addChild(tile);
	}
}

// Draw player name text, 5 px padding
var p3text = new PIXI.Text("Player 3", {font:"20px Arial", fill:"red"});
p3text.position.x = 5;
p3text.position.y = 5;
var p4text = new PIXI.Text("Player 4", {font:"20px Arial", fill:"red"});
p4text.position.x = 955-p4text.width;
p4text.position.y = 5;
var p1text = new PIXI.Text("Player 1", {font:"20px Arial", fill:"red"});
p1text.position.x = 5;
p1text.position.y = 955-p1text.height;
var p2text = new PIXI.Text("Player 2", {font:"20px Arial", fill:"red"});
p2text.position.x = 955-p2text.width;
p2text.position.y = 955-p2text.height;
stage.addChild(p1text);
stage.addChild(p2text);
stage.addChild(p3text);
stage.addChild(p4text);

requestAnimFrame(animate);

function animate() {
	requestAnimFrame(animate);
    var tiles = gameContainer.children;
    for(var i = 0; i < tiles.length; i++){
        var tile = tiles[i];
        tile.animate();
    }
	// render the stage
	renderer.render(stage);
}