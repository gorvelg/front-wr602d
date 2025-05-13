// Importation de Three.js
import * as THREE from "three";
import { AmbientLight, DirectionalLight } from "three";
import { OrbitControls } from "three/addons";

import { SoundManager } from "./src/game/globals/SoundManager";

import { getEnvironment } from "./src/game/feature/environnent";
import { setScene } from "./src/game/globals/gameState";
import { InputManager } from "./src/game/globals/InputManager";
import { loadFox } from "./src/game/feature/fox";
import { CoinManager } from "./src/game/feature/coin";
import { GameTimer } from "./src/game/feature/gameTimer";
import { checkAuthAndDisplayUI, showEmailSentMessage, showGameOverMessage } from "./src/interface/mainInterface";
import { setupLoginForm, setupRegisterForm } from "./src/interface/auth";
import { sendScoreToAPI } from "./src/interface/api";

const inputManager = new InputManager();
const coinManager = new CoinManager();

// === SETUP SCENE ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
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

// // === AXES HELPER (aide au debug)
// const axesHelper = new AxesHelper(4);
// scene.add(axesHelper);

// === LUMIÈRES ===
scene.add(new AmbientLight(0xffffff, 0.5));
const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// === CONTROLS ===
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// === TIMER ===
let timer: GameTimer;
let gameRunning = true;

const soundManager = new SoundManager(camera);

// === INITIALISATION DU JEU ===
async function init() {
    try {
        await loadFox();
        console.log("Fox chargé et prêt !");

        await soundManager.loadSound("coin", "assets/sounds/coin.mp3");
        await soundManager.loadSound("gameover", "assets/sounds/game-over.mp3");
        coinManager.setSoundManager(soundManager);

        coinManager.spawnCoins(scene, 70, 500);
        inputManager.onLoad();

        timer = new GameTimer(30, async () => {
            gameRunning = false;
            inputManager.setEnabled(false);
            const score = coinManager.getScore();
            soundManager.play("gameover");
            await sendScoreToAPI(score);
            showGameOverMessage(score);
            showEmailSentMessage(score);
        });

        timer.start();
        animate();
    } catch (error) {
        console.error("Erreur lors du chargement du Fox ou des sons :", error);
    }
}

// === AUTH CHECK ===
if (checkAuthAndDisplayUI()) {
    init(); // déjà connecté
} else {
    setupLoginForm(() => init());
    setupRegisterForm(() => {});
}

// === DÉBLOCAGE DU CONTEXTE AUDIO ===
document.addEventListener(
    "click",
    () => {
        const context = THREE.AudioContext.getContext();
        if (context.state === "suspended") {
            context.resume();
        }
    },
    { once: true },
);

// === ANIMATION LOOP ===
function animate() {
    requestAnimationFrame(animate);

    if (gameRunning) {
        inputManager.onUpdate();
        coinManager.onUpdate();
        coinManager.checkCollisions();
    }

    controls.update();
    renderer.render(scene, camera);
}

// === RESPONSIVE ===
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
