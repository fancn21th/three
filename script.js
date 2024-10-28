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

group.add(cube1);

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

const clock = new THREE.Clock();

// animation
const tick = () => {
  // clock
  const elapsedTime = clock.getElapsedTime();

  console.log(elapsedTime);

  // update objects @ the same speed
  group.position.y = Math.sin(elapsedTime);
  group.position.x = Math.cos(elapsedTime);

  // render
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
