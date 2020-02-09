import * as THREE from 'three';

export default class Octahedron extends THREE.BufferGeometry {
  constructor({ radius = 1, height = 1 }) {
    super();

    // prettier-ignore
    this.vertices = [
      1, 0, 0,
      -1, 0, 0,
      0, 1, 0,
      0, -height, 0,
      0, 0, 1,
      0, 0, -1,
    ];

    this.applyRadius(radius, height);

    // prettier-ignore
    this.indices = [
      0, 2, 4,
      0, 4, 3,
      0, 3, 5,
      0, 5, 2,
      1, 2, 5,
      1, 5, 3,
      1, 3, 4,
      1, 4, 2,
    ];

    this.setIndex(this.indices);
    this.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(this.vertices, 3),
    );
  }

  applyRadius = (radius) => {
    const vertex = new THREE.Vector3();

    // iterate over the entire buffer and apply the radius to each vertex
    for (let i = 0; i < this.vertices.length; i += 3) {
      vertex.x = this.vertices[i + 0];
      vertex.y = this.vertices[i + 1];
      vertex.z = this.vertices[i + 2];

      vertex.multiplyScalar(radius);

      this.vertices[i + 0] = vertex.x;
      this.vertices[i + 1] = vertex.y;
      this.vertices[i + 2] = vertex.z;
    }
  };
}
