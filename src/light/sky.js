import * as THREE from 'three';

export default class Sky extends THREE.Mesh {
  constructor(uniforms) {
    const vertexShader = document.getElementById('vertexShader').textContent;
    const fragmentShader = document.getElementById('fragmentShader')
      .textContent;

    const geometry = new THREE.SphereBufferGeometry(4000, 32, 15);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
    });

    super(geometry, material);
  }
}
