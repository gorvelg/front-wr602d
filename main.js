// Importation de Three.js
import * as THREE from 'three';
import {AmbientLight, AxesHelper, DirectionalLight, Mesh, Vector3} from "three";
import {OrbitControls} from "three/addons";
import GUI from 'lil-gui';

const gui = new GUI();



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

const characterGroup = new THREE.Group();
scene.add(characterGroup);

// Ajout d'un cube
const geometryBox = new THREE.BoxGeometry(4, 1, 4, ); // Géométrie d'un cube
const materialBox = new THREE.MeshStandardMaterial({ color: 0xdb1d0f, transparent: true, opacity: 0.5}); // Matériau rouge
const cube = new Mesh(geometryBox, materialBox);

const geometrySphere = new THREE.SphereGeometry(1, 32, 32);
const materialSphere = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(geometrySphere, materialSphere);

const geometryPlane = new THREE.PlaneGeometry( 10, 10 );
const materialPlane = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometryPlane, materialPlane );
scene.add(plane);
plane.rotation.x = - Math.PI / 2;
plane.position.y = -2;


// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 3;

characterGroup.add(cube, sphere);

cube.position.y = -1.5;
sphere.position.y = 0;


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
window.addEventListener('keydown', (event) => {
    keysPressed[event.code] = true;
});

window.addEventListener('keyup', (event) => {
    keysPressed[event.code] = false;
});

let lastTime = 0;
function animate(timestamp) {

    if (keysPressed['ArrowUp']) cube.position.y += 0.1;
    if (keysPressed['ArrowRight']) cube.position.x += 0.1;
    if (keysPressed['ArrowDown']) cube.position.y -= 0.1;
    if (keysPressed['ArrowLeft']) cube.position.x -= 0.1;

    const deltaTime = timestamp - lastTime;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}
requestAnimationFrame(animate);

gui.add(document, 'title').name('Titre du document')
gui.add({bool: false}, 'bool').name('Un checkbox')

gui.add(cube.position, 'x', -5, 10).name('Position X');
gui.add(cube.position, 'y', -5, 5).name('Position Y');
gui.add(cube.position, 'z', -5, 5).name('Position Z');

gui.add(
    { reset: () => cube.position.set(0, 0, 0) },
    'reset'
).name('Reset Position');

const cubeMaterial = cube.material;
const params = { color: '#ff0000' };

gui.addColor(params, 'color').onChange((value) => {
    cubeMaterial.color.set(value);
});
const cubeFolder = gui.addFolder('Rotation du cube');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('Rotation X');
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('Rotation Y');
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name('Rotation Z');
cubeFolder.open();
// Ajuster la taille du rendu en cas de redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
