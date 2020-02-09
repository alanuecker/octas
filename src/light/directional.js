import * as THREE from 'three';

export default class Directional extends THREE.DirectionalLight {
  constructor() {
    super(0xffffff, 1);

    this.color.setHSL(0.1, 1, 0.95);
    this.position.set(-1, 1.75, 1);
    this.position.multiplyScalar(30);

    this.castShadow = true;

    this.shadow.mapSize.width = 2048;
    this.shadow.mapSize.height = 2048;

    // shadow camera
    const d = 50;
    this.shadow.camera.left = -d;
    this.shadow.camera.right = d;
    this.shadow.camera.top = d;
    this.shadow.camera.bottom = -d;
    this.shadow.camera.far = 3500;
    this.shadow.bias = -0.0001;
  }
}
