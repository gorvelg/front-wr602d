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
        const geometryCoin = new BoxGeometry(0.1, 0.5, 0.5);
        const materialCoin = new MeshStandardMaterial({ color: this.coinColor });
        return new Mesh(geometryCoin, materialCoin);
    }


    checkCollisions(): void {
        const fox = getFox();
        if (!fox) return;

        for (let i = this.coins.length - 1; i >= 0; i--) {
            const coin = this.coins[i];
            const distance = fox.position.distanceTo(coin.position);

            if (distance < 1) {
                console.log('Pièce ramassée !');
                coin.parent?.remove(coin);
                this.coins.splice(i, 1);
                this.score++;
                this.updateScoreDisplay();
            }
        }


        if (this.isGameOver()) {
            this.showGameOverMessage();
        }
    }

    private score: number = 0;

    private updateScoreDisplay(): void {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = `Score : ${this.score}`;
        }
    }

    isGameOver(): boolean {
        return this.coins.length === 0;
    }

    private showGameOverMessage(): void {
        if (document.getElementById('game-over-message')) return;

        const gameOverElement = document.createElement('div');
        gameOverElement.innerHTML = 'Partie terminée ! Bravo !';
        gameOverElement.id = 'game-over-message';
        document.body.appendChild(gameOverElement);
    }

}
