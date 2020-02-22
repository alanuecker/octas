import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Renderer from './scene/renderer';
import Camera from './scene/camera';
import Octas from './scene/octas';
import Hemisphere from './light/hemisphere';
import Directional from './light/directional';
import GUI from './gui';
import Mountain from './presets/terrain';

const hemiColor = new THREE.Color(0x222222);
const hemiGroundColor = new THREE.Color(0x222222);
const terrainColor = new THREE.Color(0x222222);
const sceneBackgroundColor = new THREE.Color(0xffffff);
const dirColor = new THREE.Color(0x758184);
const fogColor = new THREE.Color(0xffffff);
const fogFar = 3000;
const octaColor = new THREE.Color(0xff0000);

const scene = new THREE.Scene();
const camera = new Camera();

const renderer = new Renderer({ antialias: true });
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.update();

const octas = new Octas(octaColor);
scene.add(octas);

const hemiLight = new Hemisphere(hemiColor, hemiGroundColor, 1);
scene.add(hemiLight);

const dirLight = new Directional(dirColor, 1);
scene.add(dirLight);

const terrain = new Mountain(terrainColor);
scene.add(terrain);

scene.background = sceneBackgroundColor;
scene.fog = new THREE.Fog(scene.background, 1, fogFar);
scene.fog.color = fogColor;

// eslint-disable-next-line no-unused-vars
const gui = new GUI({
  hemiLight,
  dirLight,
  terrain,
  scene,
  controls,
  octas,
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
