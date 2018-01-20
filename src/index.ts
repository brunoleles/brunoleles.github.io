// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import PlayerGeometry from './PlayerGeometry'
import PlayerMesh from './PlayerGeometry'
import WorldScene from './scenes/WorldScene'
import { PlaneGeometry, ImageLoader, PlaneBufferGeometry, Vector3, Matrix4, Camera, Euler, CubeGeometry, MeshBasicMaterial } from 'three'

(window as any).THREE = THREE;

import Game from './Game';
let game = new Game();
console.log(game);


import KeyboardManager from './KeyboardManager'
let keyboard_manager = new KeyboardManager()
keyboard_manager.bind(document.body)

//init renderer
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// create the scene
let scene = new WorldScene();
(window as any).scene = scene

// create the camera
let camera: Camera;

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 0
camera.position.y = 40
camera.position.z = -10

// let frustumSize = 1000;
// let aspect = window.innerWidth / window.innerHeight;
// camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize * aspect / -2, frustumSize * aspect / 2, 1, 2000);
// camera.position.x = 0
// camera.position.y = 40
// camera.position.z = -10

let texture = THREE.ImageUtils.loadTexture('/textures/grass.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(585, 585);


let material = new THREE.MeshBasicMaterial({
	// color: 0xaaaaaa,
	// wireframe: true,
	map: texture,
})




// create a box and add it to the scene
let player = new PlayerMesh()
player.position.x = 0
player.position.y = 0
scene.add(player);



let m0 = new THREE.MeshBasicMaterial({ color: '#000000' });
let m1 = new THREE.MeshBasicMaterial({ color: '#ffffff' });
let geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
geometry.faces.forEach((face, index) => { face.materialIndex = index % 2 })
let floor = new THREE.Mesh(geometry)
floor.rotation.x = - Math.PI / 2
floor.material = new THREE.MeshFaceMaterial([m0, m1]);
	// floor.scale.set(100, 100, 100)
	// floor.rotateZ(Math.PI / 4);
	scene.add(floor)





for (var i = 0; i < 10; i++) {
	let cylinder_geometry = new THREE.CylinderGeometry(.1, .1, 10);
	// let cylinder_geometry = new THREE.CubeGeometry(3, 3, 3)
	let cylinder_material = new THREE.MeshBasicMaterial({ wireframe: true, color: '#000ff0', })
	let cylinder_mesh = new THREE.Mesh(cylinder_geometry, cylinder_material);
	cylinder_mesh.name = "Cylinder-" + i;
	cylinder_mesh.position.set(10 * i, 5, 10 * i);
	// cylinder_mesh.rotation.set(Math.PI / 2, 0, 0);
	scene.add(cylinder_mesh);

}


// time util variables

let star_time = Date.now()
let last_time = Date.now()
let curr_time = Date.now()
let delt_time = 0
let runn_time = 0





function animate(): void {
	curr_time = Date.now()
	delt_time = (curr_time - last_time) * 0.001
	runn_time = (curr_time - star_time) * 0.001

	requestAnimationFrame(animate)
	render()

	last_time = Date.now();



}

function render(): void {

	game.world_direction = Game.DIR_NORT;
	// game.world_direction = Game.DIR_WEST;

	// game.world_direction = Game.DIR_SOUTH;

	if (keyboard_manager.is_key_down(keyboard_manager.KEY_UP)) {
		player.position.add(game.world_direction.clone().applyEuler(new Euler(Math.PI * 0, 0, 0)).multiplyScalar(player.move_speed));
	}

	if (keyboard_manager.is_key_down(keyboard_manager.KEY_DOWN)) {
		player.position.add(game.world_direction.clone().applyEuler(new Euler(Math.PI * 1, 0, 0)).multiplyScalar(player.move_speed));
	}

	if (keyboard_manager.is_key_down(keyboard_manager.KEY_LEFT)) {
		player.position.add(game.world_direction.clone().applyEuler(new Euler(0, Math.PI * .5, 0)).multiplyScalar(player.move_speed));
	}

	if (keyboard_manager.is_key_down(keyboard_manager.KEY_RIGHT)) {
		player.position.add(game.world_direction.clone().applyEuler(new Euler(0, Math.PI * 1.5, 0)).multiplyScalar(player.move_speed));
	}

	// player.position.y = 1 + 1 * Math.sin(runn_time * 10)
	// player.rotation.y += 0.1

	// camera.position.copy(player.position).add(new THREE.Vector3(0, 10, -10));
	// camera.position.x = player.position.x + Math.PI * 2 * Math.sin(runn_time * .2)
	// camera.position.z = player.position.z + Math.PI * 2 * Math.cos(runn_time * .2)

	// camera.position.copy(player.position).add(new THREE.Vector3(0, 12, -60));
	camera.position.copy(player.position).add(new THREE.Vector3(0, 30, -15));

	camera.lookAt(player.position)



	renderer.render(scene, camera)
}

animate()
