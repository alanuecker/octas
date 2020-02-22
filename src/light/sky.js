import * as THREE from 'three';

export default class Sky extends THREE.Mesh {
  constructor() {
    const uniforms = {
      topColor: { value: new THREE.Color('white') },
      bottomColor: { value: new THREE.Color('white') },
      offset: { value: 20 },
      exponent: { value: 0.5 },
    };

    const vertexShader = document.getElementById('vertexShader').textContent;
    const fragmentShader = document.getElementById('fragmentShader')
      .textContent;

    const geometry = new THREE.SphereBufferGeometry(2000, 32, 15);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
    });

    super(geometry, material);
  }
}
