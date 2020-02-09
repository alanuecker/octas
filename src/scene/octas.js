import * as THREE from 'three';

import Octahedron from '../presets/octahedron';

export default class Octas extends THREE.Group {
  constructor() {
    super();
    this.createOctahedrons();
  }

  createOctahedrons = () => {
    const material = new THREE.MeshLambertMaterial({ color: 0xf0f0f0 });

    for (let i = 0; i < 1; i += 1) {
      const octaGeometry = new Octahedron({ radius: 10, height: 2 });
      const octa = new THREE.Mesh(octaGeometry, material);
      octa.castShadow = true;
      octa.position.set(i, 15, 0);
      this.add(octa);
    }
  };

  render = () => {
    this.children.forEach((octa) => {
      // eslint-disable-next-line no-param-reassign
      octa.rotation.y += 0.01;
    });
  };
}
