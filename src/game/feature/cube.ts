import { BoxGeometry, MeshStandardMaterial, Mesh } from "three";

function getMeshCube() {
    const geometryBox = new BoxGeometry(4, 1, 4);
    const materialBox = new MeshStandardMaterial({ color: 0xf542c8, transparent: true, opacity: 0.5 });
    const cube = new Mesh(geometryBox, materialBox);
    return cube;
}

export { getMeshCube };
