import { BoxGeometry, MeshStandardMaterial, Mesh, Scene } from 'three';
import { GameObject } from '../utils/interface';
import { getFox } from '../globals/gameState';

export class CoinManager implements GameObject {
    private coins: Mesh[] = [];
    public coinColor: number = 0xf7ef05;
    private numberOfCoins: number = 10;

    constructor() {}

    onLoad(): void {
    }

    onUpdate(): void {
        this.coins.forEach(coin => {
            coin.rotation.y += 0.01;
        });
    }



    spawnCoins(scene: Scene): void {
        for (let i = 0; i < this.numberOfCoins; i++) {
            const coin = this.getMeshCoin();
            coin.position.set(
                Math.random() * 10 - 5,
                0.5,
                Math.random() * 10 - 5
            );
            scene.add(coin);
            this.coins.push(coin);
        }
    }




    getCoins(): Mesh[] {
        return this.coins;
    }

    private getMeshCoin(): Mesh {
        const geometryCoin = new BoxGeometry(0.2, 2, 2);
        const materialCoin = new MeshStandardMaterial({ color: this.coinColor });
        return new Mesh(geometryCoin, materialCoin);
    }


    checkCollisions(): void {
        const fox = getFox();
        if (!fox) return;

        for (let i = this.coins.length - 1; i >= 0; i--) {
            const coin = this.coins[i];
            const distance = fox.position.distanceTo(coin.position);

            if (distance < 1) { // Ajuste la distance si besoin selon la taille de ton Fox et tes pièces
                console.log('Pièce ramassée !');

                coin.parent?.remove(coin);
                this.coins.splice(i, 1);

                this.score++;
                this.updateScoreDisplay();
            }
        }
    }
    private score: number = 0;

    private updateScoreDisplay(): void {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = `Score : ${this.score}`;
        }
    }

}
