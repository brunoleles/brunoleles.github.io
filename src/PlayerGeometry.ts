import * as THREE from 'three'

export class PlayerGeometry extends THREE.BoxGeometry {

    constructor() {
        super(1, 1, 1);
    }

}

export default class PlayerMesh extends THREE.Mesh {
    constructor() {
        super(new PlayerGeometry());
    }
}