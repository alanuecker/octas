import * as THREE from 'three';

export default class Camera extends THREE.PerspectiveCamera {
  constructor() {
    super(50, window.innerWidth / window.innerHeight, 1, 5000);

    this.position.set(-1500, 300, -400);

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
