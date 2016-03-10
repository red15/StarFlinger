'use strict';

const THREE = require('three');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var viewport = new THREE.WebGLRenderer();

var light = new THREE.HemisphereLight(0xffffff, 0.5);
scene.add(light);

var axis = new THREE.AxisHelper(2);
scene.add(axis);

var cube = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshPhongMaterial({color: 0x00ff00})
);
scene.add(cube);

camera.position.z = 10;

var dt = new THREE.Clock(); // To calculate delta's
function tick() {
  var delta = dt.getDelta();
  cube.rotation.x += 0.5 * delta;
  cube.rotation.y += 0.3 * delta;
}
var tick_id = window.setInterval(tick, (1/30)*1000);

function render_tick() {
  viewport.render(scene, camera);
  window.requestAnimationFrame(render_tick);
}
render_tick();

window.addEventListener('resize', function() {
  var new_width = Math.max(window.innerWidth, parseInt(window.getComputedStyle(document.body)['min-width'])),
      new_height = Math.max(window.innerHeight, parseInt(window.getComputedStyle(document.body)['min-height']));
  // Scale the viewport size (false means to leave the canvas element alone)
  viewport.setSize(new_width * 1.0, new_height * 1.0, false);
  camera.aspect = new_width / new_height;
  camera.updateProjectionMatrix();
});

// Add canvas to the document
document.body.appendChild(viewport.domElement);

// Setting the export modules
module.exports = {
  viewport: viewport,
  scene: scene,
  camera: camera,
  cube: cube,
  axis: axis
}
