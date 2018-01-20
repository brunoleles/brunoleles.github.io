"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
var scene = new BABYLON.Scene(engine_1.default);
scene.enablePhysics();
scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
scene.collisionsEnabled = true;
scene.enablePhysics();
exports.default = scene;