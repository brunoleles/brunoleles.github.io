// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import PlayerGeometry from './PlayerGeometry'
import PlayerMesh from './PlayerGeometry'
import WorldScene from './scenes/WorldScene'
import { PlaneGeometry, ImageLoader, PlaneBufferGeometry, Vector3 } from 'three'

import KeyboardManager from './KeyboardManager'
let keyboard_manager = new KeyboardManager();
keyboard_manager.bind(document.body);

//init renderer
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// create the scene
let scene = new WorldScene()

// create the camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 0
camera.position.y = 5
camera.position.z = 5


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
player.position.x = 0.5
player.rotation.y = 0.5
scene.add(player);



let floor = new THREE.Mesh(new PlaneBufferGeometry(30, 30))
floor.rotation.x = - Math.PI / 2
floor.material = material
floor.scale.set(100, 100, 100)
scene.add(floor)

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

	last_time = Date.now()
}

function render(): void {
	
	if (keyboard_manager.is_key_down(keyboard_manager.KEY_UP)) {
		player.translateOnAxis(new Vector3(0, 0, 1), 1 * delt_time);
	}

	if (keyboard_manager.is_key_down(keyboard_manager.KEY_DOWN)) {
		player.translateOnAxis(new Vector3(0, 0, -1), 1 * delt_time);
	}


	if (keyboard_manager.is_key_down(keyboard_manager.KEY_LEFT)) {
		player.translateOnAxis(new Vector3(-1, 0, 0), 1 * delt_time);
	}

	if (keyboard_manager.is_key_down(keyboard_manager.KEY_RIGHT)) {
		player.translateOnAxis(new Vector3(1, 0, 0), 1 * delt_time);
	}

	// player.position.y = 1 + 1 * Math.sin(runn_time * 10)
	// player.rotation.x += 0.1

	camera.position.x = Math.PI * 2 * Math.sin(runn_time * .2)
	camera.position.z = Math.PI * 2 * Math.cos(runn_time * .2)
	camera.lookAt(player.position)

	renderer.render(scene, camera)
}

animate()
