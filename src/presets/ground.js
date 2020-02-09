import * as THREE from 'three';

export default class Ground extends THREE.Mesh {
  constructor(color) {
    const geometry = new THREE.PlaneBufferGeometry(10000, 10000);
    const material = new THREE.MeshLambertMaterial({ color });

    super(geometry, material);

    this.position.y = -33;
    this.rotation.x = -Math.PI / 2;
    this.receiveShadow = true;
  }
}
