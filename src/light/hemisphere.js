import * as THREE from 'three';

export default class Hemisphere extends THREE.HemisphereLight {
  constructor(color, groundColor, intensity) {
    super(color, groundColor, intensity);

    this.position.set(0, 200, 0);
  }
}
