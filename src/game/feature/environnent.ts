import * as THREE from 'three';
function getEnvironment() {
    const texture = new THREE.TextureLoader().load('../../../public/assets/ground.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.repeat.set(20, 20);

    const geometryPlane = new THREE.PlaneGeometry(10, 20);
    const materialPlane = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = Math.PI  * 0.5;

    return plane;
}


export { getEnvironment };