"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const stats_1 = require("./utils/stats");
const engine_1 = require("./engine/engine");
const scene_1 = require("./engine/scene");
const player_1 = require("./player");
console.log(player_1.default);
var sun = new BABYLON.DirectionalLight("Directional", new BABYLON.Vector3(2, -5, 0), scene_1.default);
sun.intensity = 0.9;
sun.diffuse = new BABYLON.Color3(1, 1, 0.9);
var floor = BABYLON.Mesh.CreateBox("Floor", 50, scene_1.default);
floor.position.y = 0;
floor.scaling.y = 0.1;
floor.checkCollisions = true;
floor.receiveShadows = true;
var ball = BABYLON.Mesh.CreateSphere("Ball", 20, 8, scene_1.default);
ball.position.x = -5;
ball.position.y = 10;
var box = BABYLON.Mesh.CreateBox("Cube", 2, scene_1.default);
box.position.x = 5;
box.position.y = 4;
box.position.z = -5;
box.checkCollisions = true;
var shadowGenerator = new BABYLON.ShadowGenerator(2048, sun);
shadowGenerator.getShadowMap().renderList.push(ball);
shadowGenerator.getShadowMap().renderList.push(box);
var prevTime,
    currentTime,
    deltaTime = 0;
prevTime = currentTime = Date.now();
engine_1.default.runRenderLoop(function () {
    stats_1.default.begin();
    currentTime = Date.now();
    deltaTime = (currentTime - prevTime) / 1000;
    prevTime = currentTime;
    scene_1.default.render();
    stats_1.default.end();
});