import * as THREE from 'three';
import Octahedron from './octahedron';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0xffffff, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const octaGeometry = new Octahedron({ radius: 2, height: 2 });
const material = new THREE.MeshNormalMaterial();
const octa = new THREE.Mesh(octaGeometry, material);
scene.add(octa);

const light = new THREE.PointLight(0xffffff);
light.position.set(10, 0, 25);
scene.add(light);

let pauseRender = false;
window.addEventListener(
  'resize',
  () => {
    pauseRender = true;
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    pauseRender = false;
  },
  false,
);

const render = () => {
  if (pauseRender) return;
  requestAnimationFrame(render);

  octa.rotation.y += 0.01;
  renderer.render(scene, camera);
};

// Calling the render function
render();
