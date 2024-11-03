import "./index.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";

// debugger
const debuggerGUI = new GUI({
  title: "debugger panel",
  closeFolders: true,
  close,
});

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    debuggerGUI.show(debuggerGUI._hidden);
  }
});

const debugObject = {};
const cubeTweaks = debuggerGUI.addFolder("Awesome Threejs");

// textures

// texture loader
const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//   console.log("onStart");
// };
// loadingManager.onLoad = () => {
//   console.log("onLoad");
// };
// loadingManager.onProgress = () => {
//   console.log("onProgress");
// };
// loadingManager.onError = () => {
//   console.log("onError");
// };

const textureLoader = new THREE.TextureLoader(loadingManager);

const colorTexture = textureLoader.load("/textures/door/color.jpg");

colorTexture.colorSpace = THREE.SRGBColorSpace;

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;
colorTexture.rotation = Math.PI * 0.25;

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// const geometry = new THREE.BufferGeometry();

// vertex objects
// count of triangles
// const count = 100;

// each triangle has 3 vertices
// const positionsArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = Math.random() - 0.5;
// }

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// for shader
// geometry.setAttribute("position", positionsAttribute);

// geometry object and its properties
// debugObject.color = "#00ff00";

// const material = new THREE.MeshBasicMaterial({
//   color: debugObject.color,
//   wireframe: true,
// });

// const triangles = new THREE.Mesh(geometry, material);

// scene.add(triangles);

// debug in range
// cubeTweaks.add(triangles.position, "y").min(-3).max(3).step(0.01).name("y");

// debug boolean
// cubeTweaks.add(material, "wireframe");

// debug object
// cubeTweaks.addColor(material, "color").onChange((value) => {
//   // print the color value for three.js color management
//   console.log(value.getHexString());
//   debugObject.color = value.getHexString();
//   material.color.set(debugObject.color);
// });

// debugObject.spin = () => {
//   gsap.to(triangles.rotation, { y: triangles.rotation.y + Math.PI * 2 });
// };

// cubeTweaks.add(debugObject, "spin");

// another geometry box

debugObject.subdivision = 6;

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: colorTexture })
  // new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);

box.position.x = 0;
box.position.y = 0;
box.position.z = 0;

scene.add(box);

debugObject.spin = () => {
  gsap.to(box.rotation, { y: box.rotation.y + Math.PI * 2 });
};

cubeTweaks.add(debugObject, "spin");

cubeTweaks
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  // like throttle
  .onFinishChange(() => {
    box.geometry.dispose();
    box.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision
    );
  });

// axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// camera

//  size config
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  // moving from one device to another
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

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

// camera.lookAt(triangles.position);
camera.lookAt(box.position);

scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

  // update controls
  controls.update();

  // render
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
