/* eslint-disable no-param-reassign */
import dat from 'dat.gui';
import * as THREE from 'three';

export default class GUI extends dat.GUI {
  constructor({ hemiLight, terrain, dirLight, scene, controls, octas }) {
    super();

    this.close();
    this.params = {
      'octa color': octas.children[0].material.color.getHex(),
      hemi: hemiLight.color.getHex(),
      'hemi ground': hemiLight.groundColor.getHex(),
      terrain: terrain.material.color.getHex(),
      dir: dirLight.color.getHex(),
      scene: scene.background.getHex(),
      fog: scene.fog.color.getHex(),
      'fog distance': scene.fog.far,
      'rotate camera': controls.autoRotate,
    };

    this.addColor(this.params, 'octa color').onChange((color) => {
      octas.updateColor(new THREE.Color().setHex(color));
    });
    this.addColor(this.params, 'hemi').onChange((color) => {
      hemiLight.color.setHex(color);
    });
    this.addColor(this.params, 'hemi ground').onChange((color) => {
      hemiLight.groundColor.setHex(color);
    });
    this.addColor(this.params, 'terrain').onChange((color) => {
      terrain.material.color.setHex(color);
    });
    this.addColor(this.params, 'dir').onChange((color) => {
      dirLight.color.setHex(color);
    });
    this.addColor(this.params, 'scene').onChange((color) => {
      scene.background.setHex(color);
    });
    this.addColor(this.params, 'fog').onChange((color) => {
      scene.fog.color.setHex(color);
    });
    this.add(this.params, 'fog distance', 1, 5000).onChange((far) => {
      scene.fog.far = far;
    });
    this.add(this.params, 'rotate camera').onChange((autoRotate) => {
      controls.autoRotate = autoRotate;
      controls.update();
    });
  }
}
