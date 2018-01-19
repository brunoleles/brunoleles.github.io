import { Scene, AxisHelper, DirectionalLight } from "three";

export default class WorldScene extends Scene {

    constructor() {
        super();
        this.init();
    }

    init() {

        // add axis to the scene
        let axis = new AxisHelper()
        axis.position.set(0,0,0)
        this.add(axis)


        // add lights
        let light = new DirectionalLight(0xffffff, 1.0)
        light.position.set(100, 100, 100)
        this.add(light)

        
        let light2 = new DirectionalLight(0xffffff, 1.0)
        light2.position.set(-100, 100, -100)
        this.add(light2)

    }

}