import stats from './utils/stats';

import engine from './engine/engine';
import scene from './engine/scene';

// Create a new player
var player = import('./player');

// Add a sun point light
var sun = new BABYLON.DirectionalLight(
	"Directional",
	new BABYLON.Vector3(2, -5, 0),
	scene
);
sun.intensity = 0.9;
sun.diffuse = new BABYLON.Color3(1, 1, 0.9);

// Add a large floor box
var floor = BABYLON.Mesh.CreateBox("Floor", 50, scene);
floor.position.y = 0;
floor.scaling.y = 0.1;
floor.checkCollisions = true;
floor.receiveShadows = true;

// Add example ball on the left
var ball = BABYLON.Mesh.CreateSphere("Ball", 20, 8, scene);
ball.position.x = -5;
ball.position.y = 10;

// Add a box to rotate
var box = BABYLON.Mesh.CreateBox("Cube", 2, scene);
box.position.x = 5;
box.position.y = 4;
box.position.z = -5;
box.checkCollisions = true;

// Setup Shadows
var shadowGenerator = new BABYLON.ShadowGenerator(2048, sun);
shadowGenerator.getShadowMap().renderList.push(ball);
shadowGenerator.getShadowMap().renderList.push(box);

// Setup time vars
var prevTime: number, currentTime: number, deltaTime: number = 0;
prevTime = currentTime = Date.now();

engine.runRenderLoop(function () {
	stats.begin();

	// Update the time
	currentTime = Date.now();
	deltaTime = (currentTime - prevTime) / 1000;
	prevTime = currentTime;


	// Render the scene
	scene.render();

	stats.end();
});
