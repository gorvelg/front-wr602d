import * as THREE from 'three';
function getMeshCube() {
    const geometryBox = new THREE.BoxGeometry(4, 1, 4, ); // Géométrie d'un cube
    const materialBox = new THREE.MeshStandardMaterial({ color: 0xdb1d0f, transparent: true, opacity: 0.5}); // Matériau rouge
    const cube = new Mesh(geometryBox, materialBox);
    return cube;
}

export { getMeshCube };