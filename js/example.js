// create a new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);

// create a new renderer instance
var renderer = PIXI.autoDetectRenderer(400, 300);

// add renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimFrame(animate);

// create a texture from an image path
var texture = PIXI.Texture.fromImage("img/bunny.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite to center of screen
bunny.position.x = 200;
bunny.position.y = 150;

stage.addChild(bunny);

function animate() {
	requestAnimFrame(animate);

	// rotate the bunny
	bunny.rotation += 0.1;

	// render the stage
	renderer.render(stage);
}