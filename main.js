// Importation de Three.js
import * as THREE from 'three';
import {AmbientLight, AxesHelper, DirectionalLight, Mesh, Vector3} from "three";
import {OrbitControls} from "three/addons";
import GUI from 'lil-gui';
import {getEnvironment} from "./src/game/feature/environnent.ts";
import {setCube} from "./src/game/globals/gameState";
import { InputManager } from './src/game/globals/InputManager.ts';
import {getMeshCube} from "./src/game/feature/cube";
const gui = new GUI();

const inputManager = new InputManager();


// Création de la scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Arrière-plan gris

// Création de la caméra (PerspectiveCamera)
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10; // Recule la caméra pour voir la scène
camera.position.y = 0; // Déplace la caméra vers le haut
camera.position.x = 0; // Déplace la caméra vers la droite




// Création du renderer (WebGLRenderer)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// Ajout d'un cube


const plane = getEnvironment();
scene.add(plane);

const cube = getMeshCube();
scene.add(cube);

setCube(cube);







const v1 = new Vector3(1, 2, 3);
const v2 = new Vector3(3, 2, 1);

const distance = v1.distanceTo(v2);
console.log(distance);

const addition = v1.add(v2);
const subtraction = v1.sub(v2);

// Animation (mise à jour de la scène)

const axesHelper = new AxesHelper(4)
scene.add(axesHelper)

// Lumiere
const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
// Direction de la lumiere
const directionalLight = new DirectionalLight(0xffffff, 1);
scene.add(directionalLight);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true

controls.update();

const keysPressed = {};

// Au chargement de la page
// window.addEventListener('keydown', (event) => {
//     keysPressed[event.code] = true;
// });
//
// window.addEventListener('keyup', (event) => {
//     keysPressed[event.code] = false;
// });
inputManager.onLoad()

let lastTime = 0;
function animate(timestamp) {

    inputManager.onUpdate();

    const deltaTime = timestamp - lastTime;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}
requestAnimationFrame(animate);


// Ajuster la taille du rendu en cas de redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
