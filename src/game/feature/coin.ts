import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three';

function getMeshCoin() {
    const geometryCoin = new BoxGeometry(2, 0.5, 2);
    const materialCoin = new MeshStandardMaterial({ color: 0xe8e109, transparent: true, opacity: 0.5 });
    const coin = new Mesh(geometryCoin, materialCoin);
    return coin;
}

export { getMeshCoin };
