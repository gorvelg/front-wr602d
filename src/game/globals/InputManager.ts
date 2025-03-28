import { GameObject } from '../utils/interface.ts';
import { getCube } from '../globals/gameState.ts';
import * as THREE from 'three'; // si tu as besoin d'accéder à THREE.Object3D, sinon tu peux enlever

class InputManager implements GameObject {
    private cube: THREE.Object3D | null = null;
    private keysPressed: Record<string, boolean> = {};

    constructor() {}

    onLoad(): void {
        this.cube = getCube();

        window.addEventListener('keydown', (event) => {
            this.keysPressed[event.code] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keysPressed[event.code] = false;
        });
    }

    onUpdate(): void {
        if (!this.cube) return;

        if (this.keysPressed['ArrowUp']) this.cube.position.y += 0.1;
        if (this.keysPressed['ArrowRight']) this.cube.position.x += 0.1;
        if (this.keysPressed['ArrowDown']) this.cube.position.y -= 0.1;
        if (this.keysPressed['ArrowLeft']) this.cube.position.x -= 0.1;
    }
}

export { InputManager };
