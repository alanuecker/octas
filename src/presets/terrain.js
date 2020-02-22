import * as THREE from 'three';
import SimplexNoise from 'simplex-noise';

export default class Terrain extends THREE.Mesh {
  constructor(color) {
    super();

    this.simplex = new SimplexNoise(Math.random() * Math.random());

    this.geometry = this.generateGeometry();
    this.material = new THREE.MeshLambertMaterial({
      color,
      flatShading: true,
    });

    this.rotateX(-Math.PI / 2);
    this.position.set(0, -750, 0);
    this.geometry.scale(20, 20, 20);
    this.receiveShadow = true;
  }

  map = (val, smin, smax, emin, emax) => {
    const t = (val - smin) / (smax - smin);
    return (emax - emin) * t + emin;
  };

  noise = (nx, ny) => {
    return this.map(this.simplex.noise2D(nx, ny), -1, 1, 0, 1);
  };

  octave = (nx, ny, octaves) => {
    let val = 0;
    let freq = 1;
    let max = 0;
    let amp = 1;
    for (let i = 0; i < octaves; i += 1) {
      val += this.noise(nx * freq, ny * freq) * amp;
      max += amp;
      amp /= 2;
      freq *= 2;
    }
    return val / max;
  };

  generateTexture = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;
    const c = canvas.getContext('2d');
    c.fillStyle = 'black';
    c.fillRect(0, 0, width, height);

    for (let i = 0; i < width; i += 1) {
      for (let j = 0; j < height; j += 1) {
        const v = this.octave(i / width, j / height, 16);
        const per = `${(100 * v).toFixed(2)}%`;
        c.fillStyle = `rgb(${per},${per},${per})`;
        c.fillRect(i, j, 1, 1);
      }
    }
    return c.getImageData(0, 0, width, height);
  };

  generateGeometry = () => {
    const data = this.generateTexture(200, 200);
    const geometry = new THREE.PlaneGeometry(
      data.width,
      data.height,
      data.width,
      data.height + 1,
    );
    // assign vert data from the canvas
    for (let j = 0; j < data.height; j += 1) {
      for (let i = 0; i < data.width; i += 1) {
        const n = j * data.height + i;
        const nn = j * (data.height + 1) + i;
        const col = data.data[n * 4]; // the red channel
        const v1 = geometry.vertices[nn];
        v1.z = this.map(col, 0, 255, -20, 75); // map from 0:255 to -10:10
      }
    }

    geometry.computeFlatVertexNormals();
    return geometry;
  };
}
