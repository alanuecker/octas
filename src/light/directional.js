import * as THREE from 'three';

export default class Directional extends THREE.DirectionalLight {
  constructor(color, intensity) {
    super(color, intensity);

    this.castShadow = true;

    this.shadow.mapSize.width = 2048;
    this.shadow.mapSize.height = 2048;

    // shadow camera
    const d = 400;
    this.shadow.camera.left = -d;
    this.shadow.camera.right = d;
    this.shadow.camera.top = d;
    this.shadow.camera.bottom = -d;
    this.shadow.camera.far = 3500;
    this.shadow.bias = -0.0001;
  }
}
