declare var canvas: any;
declare var $: any;

import scene from './engine/scene';
import { FollowCamera } from 'babylonjs';

// Add first person player camera with physics
let camera:FollowCamera;

// camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -15), scene);
// camera.setTarget(new BABYLON.Vector3(0, 0, 0));
// camera.checkCollisions = true;
// camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
// camera.applyGravity = true;

let me = BABYLON.Mesh.CreateBox("MeBox", 2, scene, true);

camera = new BABYLON.FollowCamera("FollowCamera", new BABYLON.Vector3(0, 5, -30), scene)
camera.setTarget(me.position);
// camera.checkCollisions = false;
// camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
// camera.applyGravity = true;

// camera.keysUp.push(90); // Z
// camera.keysUp.push(87); // W
// camera.keysDown.push(83); // S
// camera.keysLeft.push(65); // A
// camera.keysLeft.push(81); // Q
// camera.keysRight.push(69); // E
// camera.keysRight.push(68); // D
// camera.speed = 0.8;


// Add camera controls to the canvas
scene.activeCamera.attachControl(document.body);

// scene.activeCamera.keysUp.push(90); // Z
// scene.activeCamera.keysUp.push(87); // W
// scene.activeCamera.keysDown.push(83); // S
// scene.activeCamera.keysLeft.push(65); // A
// scene.activeCamera.keysLeft.push(81); // Q
// scene.activeCamera.keysRight.push(69); // E
// scene.activeCamera.keysRight.push(68); // D
// scene.activeCamera.speed = 0.8;

export default {
  camera: camera
};
