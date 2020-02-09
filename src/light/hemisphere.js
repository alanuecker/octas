import * as THREE from 'three';

export default class Hemisphere extends THREE.HemisphereLight {
  constructor(color, groundColor) {
    super(0xffffff, 0xffffff, 0.6);

    this.color = color;
    this.groundColor = groundColor;
    this.position.set(0, 50, 0);
  }
}
