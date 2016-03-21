'use strict';

const EventEmitter = require('events').EventEmitter;
const THREE = require('three');

class World extends THREE.Scene {
  constructor() {
    super();
    this.light = new THREE.HemisphereLight(0xffffff, 0.5);
    this.axis = new THREE.AxisHelper(2);
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshPhongMaterial({color: 0x00ff00})
    );

    this.add(this.light);
    this.add(this.axis);
    this.add(this.cube);
  }
}

class Game extends EventEmitter {
  constructor() {
    super();

    this.world = new World();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.viewport = new THREE.WebGLRenderer({antialias: Config.antialias});
    this.dt = new THREE.Clock();

    this.camera.position.z = 10;

    // Add canvas to the document
    document.body.appendChild(this.viewport.domElement);

    window.addEventListener('resize', () => {
      var new_width = Math.max(window.innerWidth, parseInt(window.getComputedStyle(document.body)['min-width'])),
          new_height = Math.max(window.innerHeight, parseInt(window.getComputedStyle(document.body)['min-height']));
      // Scale the viewport size (false means to leave the canvas element alone)
      this.viewport.setSize(new_width * Config.scaling, new_height * Config.scaling, false);
      this.camera.aspect = new_width / new_height;
      this.camera.updateProjectionMatrix();
    });

    // Register event listener for the scaling parameter
    Config.on('update:scaling', () => {
      window.dispatchEvent(new Event('resize'));
    })

    // Three.js cannot change antialias on the fly
    Config.on('update:antialias', () => {
      // Ensure the changes on this option are saved to persist through reload
      Config.save();
      document.location.reload();
    });

    // Trigger the resize event for initial scaling correction
    window.dispatchEvent(new Event('resize'));

    // Kickstart the logic tick
    this.callback_tick = this.tick.bind(this);
    window.setInterval(this.callback_tick, (1/30)*1000);

    // And the rendering loop
    this.callback_render = this.render.bind(this);
    this.callback_render();
  }

  tick() {
    // Gamelogic tick
    var delta = this.dt.getDelta();
    this.world.cube.rotation.x += 0.5 * delta;
    this.world.cube.rotation.y += 0.3 * delta;
  }

  render() {
    this.viewport.render(this.world, this.camera);
    window.requestAnimationFrame(this.callback_render);
  }
}

// Setting the export
module.exports = new Game();
