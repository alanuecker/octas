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

    this.uv = [];
    this.generateUVs();

    this.setIndex(this.indices);
    this.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(this.vertices, 3),
    );
    this.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));

    this.computeVertexNormals();
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

  generateUVs = () => {
    const vertex = new THREE.Vector3();

    for (let i = 0; i < this.vertices.length; i += 3) {
      vertex.x = this.vertices[i + 0];
      vertex.y = this.vertices[i + 1];
      vertex.z = this.vertices[i + 2];

      const u = this.azimuth(vertex) / 2 / Math.PI + 0.5;
      const v = this.inclination(vertex) / Math.PI + 0.5;
      this.uv.push(u, 1 - v);
    }

    this.correctUVs();

    this.correctSeam();
  };

  correctSeam = () => {
    // handle case when face straddles the seam, see #3269

    for (let i = 0; i < this.uv.length; i += 6) {
      // uv data of a single face

      const x0 = this.uv[i + 0];
      const x1 = this.uv[i + 2];
      const x2 = this.uv[i + 4];

      const max = Math.max(x0, x1, x2);
      const min = Math.min(x0, x1, x2);

      // 0.9 is somewhat arbitrary

      if (max > 0.9 && min < 0.1) {
        if (x0 < 0.2) this.uv[i + 0] += 1;
        if (x1 < 0.2) this.uv[i + 2] += 1;
        if (x2 < 0.2) this.uv[i + 4] += 1;
      }
    }
  };

  correctUVs = () => {
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const c = new THREE.Vector3();

    const centroid = new THREE.Vector3();

    const uvA = new THREE.Vector2();
    const uvB = new THREE.Vector2();
    const uvC = new THREE.Vector2();

    for (let i = 0, j = 0; i < this.vertices.length; i += 9, j += 6) {
      a.set(this.vertices[i + 0], this.vertices[i + 1], this.vertices[i + 2]);
      b.set(this.vertices[i + 3], this.vertices[i + 4], this.vertices[i + 5]);
      c.set(this.vertices[i + 6], this.vertices[i + 7], this.vertices[i + 8]);

      uvA.set(this.uv[j + 0], this.uv[j + 1]);
      uvB.set(this.uv[j + 2], this.uv[j + 3]);
      uvC.set(this.uv[j + 4], this.uv[j + 5]);

      centroid
        .copy(a)
        .add(b)
        .add(c)
        .divideScalar(3);

      const azi = this.azimuth(centroid);

      this.correctUV(uvA, j + 0, a, azi);
      this.correctUV(uvB, j + 2, b, azi);
      this.correctUV(uvC, j + 4, c, azi);
    }
  };

  correctUV = (uv, stride, vector, azimuth) => {
    if (azimuth < 0 && uv.x === 1) {
      this.uv[stride] = uv.x - 1;
    }

    if (vector.x === 0 && vector.z === 0) {
      this.uv[stride] = azimuth / 2 / Math.PI + 0.5;
    }
  };

  // Angle around the Y axis, counter-clockwise when looking from above.
  azimuth = (vector) => {
    return Math.atan2(vector.z, -vector.x);
  };

  // Angle above the XZ plane.
  inclination = (vector) => {
    return Math.atan2(
      -vector.y,
      Math.sqrt(vector.x * vector.x + vector.z * vector.z),
    );
  };
}
