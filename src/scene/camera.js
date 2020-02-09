import * as THREE from 'three';

export default class Camera extends THREE.PerspectiveCamera {
  constructor() {
    super(30, window.innerWidth / window.innerHeight, 1, 5000);

    this.position.z = 250;

    this.pauseRender = false;
    window.addEventListener(
      'resize',
      () => {
        this.pauseRender = true;
        this.aspect = window.innerWidth / window.innerHeight;
        this.updateProjectionMatrix();
        this.pauseRender = false;
      },
      false,
    );
  }
}
