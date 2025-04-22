// Importation de Three.js
import * as THREE from 'three';
import { AmbientLight, AxesHelper, DirectionalLight, Vector3 } from "three";
import { OrbitControls } from 'three/addons';
import GUI from 'lil-gui';
import { getEnvironment } from "./src/game/feature/environnent.ts";
import { setCoin, setCube, setScene } from "./src/game/globals/gameState";
import { InputManager } from './src/game/globals/InputManager.ts';
import { getMeshCube } from "./src/game/feature/cube";
import { getMeshCoin } from "./src/game/feature/coin";
import { loadFox } from './src/game/feature/fox';

const gui = new GUI();
const inputManager = new InputManager();

// === SETUP SCENE ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
setScene(scene);

// === CAMERA ===
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10);
camera.lookAt(0, 0, 0);

// === RENDERER ===
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === SOL ===
const plane = getEnvironment();
scene.add(plane);

// === CUBE JOUEUR (si besoin encore utilisé ailleurs) ===
const player = getMeshCube();
scene.add(player);
setCube(player);

// === PIÈCE ===
const coin = getMeshCoin();
scene.add(coin);
setCoin(coin);

// === VECTEURS (tes tests, pas touché) ===
const v1 = new Vector3(1, 2, 3);
const v2 = new Vector3(3, 2, 1);
console.log('Distance:', v1.distanceTo(v2));
console.log('Addition:', v1.add(v2));
console.log('Subtraction:', v1.sub(v2));

// === AXES HELPER ===
const axesHelper = new AxesHelper(4);
scene.add(axesHelper);

// === LUMIÈRES ===
scene.add(new AmbientLight(0xffffff, 0.5));
const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// === CONTROLS ===
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ==============================================
// === 💥 CHARGEMENT DU FOX AVEC AWAIT + INPUT ===
// ==============================================

async function init() {
    try {
        // 🦊 On attend le chargement du Fox AVANT de démarrer l'inputManager
        await loadFox();
        console.log('Fox chargé et prêt !');
        inputManager.onLoad(); // 💯 → Maintenant getFox() est dispo
        animate();
    } catch (error) {
        console.error('Erreur lors du chargement du Fox :', error);
    }
}

init(); // Lance le démarrage de ton jeu

// === ANIMATION LOOP ===
function animate() {
    requestAnimationFrame(animate);
    inputManager.onUpdate();
    controls.update();
    renderer.render(scene, camera);
}

// === RESIZE ===
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
