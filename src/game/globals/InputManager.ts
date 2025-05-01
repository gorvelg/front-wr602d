import { GameObject } from '../utils/interface';
import { getFox } from '../globals/gameState';
import * as THREE from 'three';

class InputManager implements GameObject {
    private fox: THREE.Object3D | null = null;
    private keysPressed: Record<string, boolean> = {};
    private enabled: boolean = true; // ✅ état activé/désactivé

    constructor() {}

    onLoad(): void {
        this.fox = getFox();

        if (!this.fox) {
            console.error('Fox non trouvé dans le GameState');
            return;
        }

        window.addEventListener('keydown', (event) => {
            this.keysPressed[event.code] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keysPressed[event.code] = false;
        });
    }

    setEnabled(value: boolean): void {
        this.enabled = value;
    }

    onUpdate(): void {
        if (!this.enabled || !this.fox) return; // ⛔ si désactivé, rien ne bouge

        const moveSpeed = 0.1;
        const rotateSpeed = 0.05;

        if (this.keysPressed['ArrowLeft'] || this.keysPressed['KeyA']) {
            this.fox.rotation.y += rotateSpeed;
        }
        if (this.keysPressed['ArrowRight'] || this.keysPressed['KeyD']) {
            this.fox.rotation.y -= rotateSpeed;
        }

        const direction = new THREE.Vector3(0, 0, 1);
        direction.applyEuler(this.fox.rotation);

        if (this.keysPressed['ArrowUp'] || this.keysPressed['KeyW']) {
            this.fox.position.addScaledVector(direction, moveSpeed);
        }
        if (this.keysPressed['ArrowDown'] || this.keysPressed['KeyS']) {
            this.fox.position.addScaledVector(direction, -moveSpeed);
        }
    }
}

export { InputManager };
