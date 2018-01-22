import * as THREE from 'three'

export class PlayerGeometry extends THREE.BoxGeometry {

    constructor() {
        super(1, 1, 1);
    }

}

export default class PlayerMesh extends THREE.Object3D {

    turret: THREE.Mesh;

    move_speed: number = .10;

    constructor() {
        super();

        this.name = "Player";

        this.add(new THREE.Mesh(new THREE.SphereBufferGeometry(.1), new THREE.MeshBasicMaterial({ color: '#0000ff' })));

        let nose_geometry = new THREE.SphereBufferGeometry(.1);
        let nose_material = new THREE.MeshBasicMaterial({ wireframe: true, color: '#ff0000', })
        let nose_mesh = new THREE.Mesh(nose_geometry, nose_material);
        nose_mesh.position.set(0, .5, .5)
        this.add(nose_mesh);


        let player_geometry = new PlayerGeometry();
        let player_material = new THREE.MeshBasicMaterial({ wireframe: true, color: '#ff0000', })
        // player_material = new THREE.MeshLambertMaterial({ color: '#ff0000', overdraw: .7 });
        let player_mesh = new THREE.Mesh(player_geometry, player_material);
        player_mesh.position.set(0, .5, 0)
        this.add(player_mesh);



        let cylinder_geometry = new THREE.CylinderGeometry(.1, .1, 1);
        cylinder_geometry.rotateX(Math.PI / 2);
        cylinder_geometry.translate(0, .5, 1);

        let cylinder_material = new THREE.MeshBasicMaterial({ wireframe: true, color: '#0ff000', })
        let cylinder_mesh = new THREE.Mesh(cylinder_geometry, cylinder_material);
        // cylinder_mesh.position.set(0, .5, .5);
        // cylinder_mesh.rotation.set(Math.PI/2, 0, 0);
        this.add(cylinder_mesh);

        this.turret = cylinder_mesh;
    }
}