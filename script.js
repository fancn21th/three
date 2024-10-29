import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// objects
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

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

// 45 - 75 is recommended for perspective camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// const aspectRatio = sizes.width / sizes.height;

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1
// );

camera.position.z = 3;

// camera.position.set(2, 2, 2);

camera.lookAt(mesh.position);

scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

// mouse
// const cursor = {
//   x: 0,
//   y: 0,
// };

// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);
//   console.log(cursor);
// });

// animation
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // update objects
  // mesh.rotation.y = elapsedTime;
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;

  // camera.lookAt(mesh.position);

  // render
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
