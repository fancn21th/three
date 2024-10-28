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

let time = Date.now();

// animation
const tick = () => {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  console.log(deltaTime);

  // update objects @ the same speed
  group.rotation.y += 0.001 * deltaTime;
  group.rotation.x += 0.001 * deltaTime;

  // render
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
