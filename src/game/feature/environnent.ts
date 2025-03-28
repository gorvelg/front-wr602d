import * as THREE from 'three';
function getEnvironment() {
    const geometryPlane = new THREE.PlaneGeometry( 10, 10 );
    const materialPlane = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometryPlane, materialPlane );
    return plane;
}

export { getEnvironment };