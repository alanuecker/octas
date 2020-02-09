import * as THREE from 'three';

export default class Renderer extends THREE.WebGLRenderer {
  constructor(props) {
    super(props);

    this.setClearColor(0xffffff, 1);
    this.setSize(window.innerWidth, window.innerHeight);
    this.setPixelRatio(window.devicePixelRatio);
    this.outputEncoding = THREE.sRGBEncoding;
    this.shadowMap.enabled = true;

    this.pauseRender = false;
    window.addEventListener(
      'resize',
      () => {
        this.pauseRender = true;
        this.setSize(window.innerWidth, window.innerHeight);
        this.pauseRender = false;
      },
      false,
    );
  }

  renderScene = (props) => {
    const { scene, camera, cb } = props;
    if (this.pauseRender) return;
    requestAnimationFrame(() => this.renderScene(props));
    this.render(scene, camera);
    cb();
  };
}
