import { GameObject } from '../utils/interface';
import { getFox } from '../globals/gameState'; // 🦊 On utilise getFox ici
import * as THREE from 'three';

class InputManager implements GameObject {
    private fox: THREE.Object3D | null = null; // Renommé cube → fox
    private keysPressed: Record<string, boolean> = {};

    constructor() {}

    onLoad(): void {
        this.fox = getFox(); // 🦊 Récupère le Fox

        if (!this.fox) {
            console.error('Fox non trouvé dans le GameState, assure-toi que setFox() est bien appelé après le chargement.');
            return;
        }

        window.addEventListener('keydown', (event) => {
            this.keysPressed[event.code] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keysPressed[event.code] = false;
        });
    }

    onUpdate(): void {
        if (!this.fox) return;

        const speed = 0.1;

        // === Déplacement ===
        if (this.keysPressed['ArrowUp'] || this.keysPressed['KeyW']) this.fox.position.z += speed;
        if (this.keysPressed['ArrowDown'] || this.keysPressed['KeyS']) this.fox.position.z -= speed;
        if (this.keysPressed['ArrowLeft'] || this.keysPressed['KeyA']) this.fox.position.x -= speed;
        if (this.keysPressed['ArrowRight'] || this.keysPressed['KeyD']) this.fox.position.x += speed;
    }
}

export { InputManager };
