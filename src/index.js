import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';

import Renderer from './scene/renderer';
import Camera from './scene/camera';
import Octas from './scene/octas';
import Hemisphere from './light/hemisphere';
import Directional from './light/directional';
import Ground from './presets/ground';
import Sky from './light/sky';

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

const sky = new Sky(uniforms);
scene.add(sky);

scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(scene.background, 1, 5000);
scene.fog.color.copy(uniforms.bottomColor.value);

const gui = new dat.GUI();
const params = {
  hemi: hemiLight.color.getHex(),
  'hemi ground': hemiLight.groundColor.getHex(),
  ground: ground.material.color.getHex(),
  dir: dirLight.color.getHex(),
  'sky top': uniforms.topColor.value.getHex(),
  'sky bottom': uniforms.bottomColor.value.getHex(),
  scene: scene.background.getHex(),
};
gui.addColor(params, 'hemi').onChange((color) => {
  hemiLight.color.setHex(color);
});
gui.addColor(params, 'hemi ground').onChange((color) => {
  hemiLight.groundColor.setHex(color);
});
gui.addColor(params, 'ground').onChange((color) => {
  ground.material.color.setHex(color);
});
gui.addColor(params, 'dir').onChange((color) => {
  dirLight.color.setHex(color);
});
gui.addColor(params, 'scene').onChange((color) => {
  scene.background.setHex(color);
});
gui.addColor(params, 'sky top').onChange((color) => {
  sky.material.uniforms.topColor.value = new THREE.Color().setHex(color);
});
gui.addColor(params, 'sky bottom').onChange((color) => {
  sky.material.uniforms.bottomColor.value = new THREE.Color().setHex(color);
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
