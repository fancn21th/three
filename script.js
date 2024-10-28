import * as THREE from "three";

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  // wireframe: true,
});
// combine geometry and material
const mesh = new THREE.Mesh(geometry, material);

// mesh.position.x = -0.7;
// mesh.position.y = -0.6;
// mesh.position.z = -1;

mesh.position.set(0.7, -0.6, -1);

mesh.scale.set(2, 0.5, 0.5);

console.log(mesh.position.length());
// add mesh to scene
scene.add(mesh);

// axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// camera

//  size config
const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// camera.position.z = 3;

camera.position.set(1, 1, 3);

scene.add(camera);

console.log(mesh.position.distanceTo(camera.position));

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

// by default the camera is inside the cube, so we need to move it back as line 27
renderer.render(scene, camera);
