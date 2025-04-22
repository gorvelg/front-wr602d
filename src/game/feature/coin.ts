import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three';

const coinColor: number = 0xf7ef05;

function getMeshCoin(): Mesh {
    const geometryCoin = new BoxGeometry(2, 0.5, 2);
    const materialCoin = new MeshStandardMaterial({ color: coinColor });
    const coin = new Mesh(geometryCoin, materialCoin);
    return coin;
}

export { getMeshCoin };
