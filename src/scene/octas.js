import * as THREE from 'three';

import Octahedron from '../presets/octahedron';

export default class Octas extends THREE.Group {
  constructor() {
    super();

    this.width = 250;
    this.height = 150;
    this.depth = 250;

    this.createOctahedrons();
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  createOctahedrons = () => {
    const material = new THREE.MeshLambertMaterial({ color: 0x5d5b6a });

    for (let i = 0; i < 50; i += 1) {
      const octaGeometry = new Octahedron({
        radius: this.getRandomInt(10, 20),
        height: this.getRandomInt(2, 4),
      });
      const octa = new THREE.Mesh(octaGeometry, material);
      octa.castShadow = true;
      octa.position.set(
        this.getRandomInt(-this.width, this.width),
        this.getRandomInt(-this.height, this.height) + this.height * 1.5,
        this.getRandomInt(-this.depth, this.depth),
      );
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
