import * as THREE from 'three';
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

const octas = new Octas();
scene.add(octas);

const hemiColor = new THREE.Color('hsl(44, 2%, 31%)');
const groundColor = new THREE.Color('hsl(4, 2%, 12%)');

const hemiLight = new Hemisphere(hemiColor, groundColor);
scene.add(hemiLight);

const dirLight = new Directional();
scene.add(dirLight);

const ground = new Ground(groundColor);
scene.add(ground);

const uniforms = {
  topColor: { value: hemiColor },
  bottomColor: { value: new THREE.Color(0xf0f0f0) },
  offset: { value: 33 },
  exponent: { value: 0.6 },
};

const sky = new Sky(uniforms);
scene.add(sky);

scene.background = new THREE.Color('hsl(216, 0%, 100%)');
scene.fog = new THREE.Fog(scene.background, 1, 5000);
scene.fog.color.copy(uniforms.bottomColor.value);

renderer.renderScene({
  scene,
  camera,
  cb: () => {
    octas.render();
  },
});
