import * as THREE from 'three'

export class PlayerGeometry extends THREE.BoxGeometry {

    constructor() {
        super(1, 1, 1);
    }
    
}

export default class PlayerMesh extends THREE.Object3D {

    move_speed: number = 10;

    constructor() {
        super();

        this.add(new THREE.Mesh(new THREE.SphereBufferGeometry(.1), new THREE.MeshBasicMaterial({ color: '#0000ff' })));

        let nose_geometry = new THREE.SphereBufferGeometry(.1);
        let nose_material = new THREE.MeshBasicMaterial({ wireframe: true, color: '#ff0000', })
        let nose_mesh = new THREE.Mesh(nose_geometry, nose_material);
        nose_mesh.position.set(0, .5, .5)
        this.add(nose_mesh);


        let player_geometry = new PlayerGeometry();
        let player_material = new THREE.MeshBasicMaterial({ wireframe: true, color: '#ff0000', })
        player_material = new THREE.MeshLambertMaterial({ color: '#ff0000', overdraw: .7 });
        let player_mesh = new THREE.Mesh(player_geometry, player_material);
        player_mesh.position.set(0, .5, 0)
        this.add(player_mesh);

    }
}