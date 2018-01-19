// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import PlayerGeometry from './PlayerGeometry'
import PlayerMesh from './PlayerGeometry'
import WorldScene from './scenes/WorldScene'
import { PlaneGeometry } from 'three'

import './textures/grass.jpg'

//init renderer
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// create the scene
let scene = new WorldScene()

// create the camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 5
camera.position.y = 5
camera.position.z = 5

let material = new THREE.MeshBasicMaterial({
	color: 0xaaaaaa,
	wireframe: true
})



// create a box and add it to the scene
let player = new PlayerMesh()
player.position.x = 0.5
player.rotation.y = 0.5
scene.add(player)



let floor = new THREE.Mesh(new PlaneGeometry(100, 100));
floor.rotation.x = - Math.PI / 2;
scene.add(floor);

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
	player.position.y = 4 * Math.sin(runn_time * 1)
	player.rotation.x += 0.1

	camera.lookAt(player.position)
	camera.position.x = Math.PI * 2 * Math.sin(runn_time)
	camera.position.z = Math.PI * 2 * Math.cos(runn_time)

	renderer.render(scene, camera)
}

animate()
