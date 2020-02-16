/* eslint-disable no-param-reassign */
import dat from 'dat.gui';
import * as THREE from 'three';

export default class GUI extends dat.GUI {
  constructor({ hemiLight, ground, dirLight, skyTop, skyBottom, scene, sky }) {
    super();

    this.params = {
      hemi: hemiLight.color.getHex(),
      'hemi ground': hemiLight.groundColor.getHex(),
      ground: ground.material.color.getHex(),
      dir: dirLight.color.getHex(),
      'sky top': skyTop.getHex(),
      'sky bottom': skyBottom.getHex(),
      scene: scene.background.getHex(),
      fog: scene.fog.color.getHex(),
      'fog far': scene.fog.far,
    };
    if (hemiLight) {
      this.addColor(this.params, 'hemi').onChange((color) => {
        hemiLight.color.setHex(color);
      });
      this.addColor(this.params, 'hemi ground').onChange((color) => {
        hemiLight.groundColor.setHex(color);
      });
    }
    if (ground) {
      this.addColor(this.params, 'ground').onChange((color) => {
        ground.material.color.setHex(color);
      });
    }
    if (dirLight) {
      this.addColor(this.params, 'dir').onChange((color) => {
        dirLight.color.setHex(color);
      });
    }
    if (sky) {
      this.addColor(this.params, 'sky top').onChange((color) => {
        sky.material.uniforms.topColor.value = new THREE.Color().setHex(color);
      });
      this.addColor(this.params, 'sky bottom').onChange((color) => {
        sky.material.uniforms.bottomColor.value = new THREE.Color().setHex(
          color,
        );
      });
    }
    if (scene) {
      this.addColor(this.params, 'scene').onChange((color) => {
        scene.background.setHex(color);
      });
      this.addColor(this.params, 'fog').onChange((color) => {
        scene.fog.color.setHex(color);
      });
      this.add(this.params, 'fog far', 1, 5000).onChange((far) => {
        scene.fog.far = far;
      });
    }
  }
}
