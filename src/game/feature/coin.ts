import { CylinderGeometry, MeshStandardMaterial, TextureLoader, Mesh } from "three";
import { GameObject } from "../utils/interface";
import { getFox } from "../globals/gameState";
import { SoundManager } from "../globals/soundManager";

export class CoinManager implements GameObject {
    private coins: Mesh[] = [];
    public coinColor: number = 0xf7ef05;
    private numberOfCoins: number = 40;
    private soundManager?: SoundManager;

    constructor() {}

    onLoad(): void {}

    onUpdate(): void {
        this.coins.forEach((coin) => {
            coin.rotation.z += 0.05;
        });
    }

    spawnCoins(scene: THREE.Scene, totalCoins: number = 10, interval: number = 1000): void {
        let spawned = 0;

        const intervalId = setInterval(() => {
            if (spawned >= totalCoins) {
                clearInterval(intervalId);
                return;
            }

            const coin = this.getMeshCoin();
            coin.position.set(Math.random() * 10 - 5, 0.5, Math.random() * 10 - 5);
            scene.add(coin);
            this.coins.push(coin);

            spawned++;
        }, interval);
    }

    getCoins(): Mesh[] {
        return this.coins;
    }

    private getMeshCoin(): Mesh {
        const loader = new TextureLoader();
        const geometryCoin = new CylinderGeometry(0.3, 0.3, 0.09, 32);
        const materialCoin = new MeshStandardMaterial({
            color: this.coinColor,
            map: loader.load("../../../public/assets/coin.png"),
        });
        const coin = new Mesh(geometryCoin, materialCoin);

        coin.rotation.x = Math.PI / 2;

        return coin;
    }

    setSoundManager(manager: SoundManager) {
        this.soundManager = manager;
    }

    checkCollisions(): void {
        const fox = getFox();
        if (!fox) return;

        for (let i = this.coins.length - 1; i >= 0; i--) {
            const coin = this.coins[i];
            const distance = fox.position.distanceTo(coin.position);

            if (distance < 1) {
                coin.parent?.remove(coin);
                this.coins.splice(i, 1);
                this.score++;
                this.updateScoreDisplay();
                this.soundManager?.play("coin");
            }
        }
    }

    private score: number = 0;

    private updateScoreDisplay(): void {
        const scoreElement = document.getElementById("score");
        if (scoreElement) {
            scoreElement.textContent = `Score : ${this.score}`;
        }
    }

    getScore(): number {
        return this.score;
    }
}
