import * as THREE from 'three'

export class PlayerGeometry extends THREE.BoxGeometry {

    constructor() {
        super(1, 1, 1);
    }

}

export default class PlayerMesh extends THREE.Object3D {

    constructor() {
        super();


        this.add(new THREE.Mesh(new THREE.SphereBufferGeometry(.1), new THREE.MeshBasicMaterial({ color: '#0000ff' })));

        let player_geometry = new PlayerGeometry();
        let player_material = new THREE.MeshBasicMaterial({ wireframe: true, color: '#ff0000', })
        let player_mesh = new THREE.Mesh(player_geometry, player_material);
        player_mesh.position.set(0, .5, 0)
        this.add(player_mesh);

    }
}