import * as THREE from "three";

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// objects
const group = new THREE.Group();

group.position.y = 1;

scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

cube2.position.x = -2;
cube3.position.x = 2;

group.add(cube1);
group.add(cube2);
group.add(cube3);

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

camera.position.set(-1, 1, 3);

scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

// by default the camera is inside the cube, so we need to move it back as line 27
renderer.render(scene, camera);
