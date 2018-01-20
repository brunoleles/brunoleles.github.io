"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const scene_1 = require("./engine/scene");
var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -15), scene_1.default);
camera.setTarget(new BABYLON.Vector3(0, 0, 0));
camera.checkCollisions = true;
camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
camera.applyGravity = true;
scene_1.default.activeCamera.attachControl(canvas);
exports.default = {
    camera: camera
};