import * as THREE from 'three';

export default class Ground extends THREE.Mesh {
  constructor(color) {
    super();
    this.geometry = new THREE.PlaneBufferGeometry(10000, 10000);
    this.material = new THREE.MeshLambertMaterial({ color });

    this.position.y = -33;
    this.rotation.x = -Math.PI / 2;
    this.receiveShadow = true;
  }
}
