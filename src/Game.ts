import { Vector3 } from "three";

export default class Game {


	static DIR_ZERO: Vector3 = new Vector3(0, 0, 0)
	static DIR_UP: Vector3 = new Vector3(0, 1, 0)

	static DIR_NORT: Vector3 = new Vector3(0, 0, 1)
	static DIR_SOUTH: Vector3 = new Vector3(0, 0, -1)
	static DIR_WEST: Vector3 = new Vector3(+1, 0, 0)
	static DIR_EAST: Vector3 = new Vector3(-1, 0, 0)

	world_direction: Vector3 = Game.DIR_NORT;

}