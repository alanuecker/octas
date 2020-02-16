import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Renderer from './scene/renderer';
import Camera from './scene/camera';
import Octas from './scene/octas';
import Hemisphere from './light/hemisphere';
import Directional from './light/directional';
import Ground from './presets/ground';
// import Sky from './light/sky';
import GUI from './gui';

const scene = new THREE.Scene();
const camera = new Camera();

const renderer = new Renderer({ antialias: true });
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.update();

const octas = new Octas();
scene.add(octas);

const hemiColor = new THREE.Color(0x222222);
const groundColor = new THREE.Color(0x222222);
const skyBottomColor = new THREE.Color(0x0);
const dirColor = new THREE.Color(0x758184);
const fogColor = new THREE.Color(0xffffff);
const fogFar = 2200;

const hemiLight = new Hemisphere(hemiColor, groundColor, 1);
scene.add(hemiLight);

const dirLight = new Directional(dirColor, 1);
scene.add(dirLight);

const ground = new Ground(groundColor);
scene.add(ground);

const uniforms = {
  topColor: { value: hemiColor },
  bottomColor: { value: skyBottomColor },
  offset: { value: 20 },
  exponent: { value: 0.5 },
};

// const sky = new Sky(uniforms);
// scene.add(sky);

scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(scene.background, 1, fogFar);
scene.fog.color = fogColor;

// eslint-disable-next-line no-unused-vars
const gui = new GUI({
  hemiLight,
  ground,
  dirLight,
  skyTop: uniforms.topColor.value,
  skyBottom: uniforms.bottomColor.value,
  scene,
  // sky,
});

renderer.renderScene({
  scene,
  camera,
  cb: () => {
    dirLight.position.set(
      (camera.position.x * -1) / 3,
      camera.position.y,
      (camera.position.z * -1) / 3,
    );
    controls.update();
    octas.render();
  },
});
