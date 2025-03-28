import { GameObject } from '../utils/interface';
class InputManager extends GameObject {

    private cube = null;

    constructor() {
        super();
    }
    onUpdate() {
        if (keysPressed['ArrowUp']) cube.position.y += 0.1;
        if (keysPressed['ArrowRight']) cube.position.x += 0.1;
        if (keysPressed['ArrowDown']) cube.position.y -= 0.1;
        if (keysPressed['ArrowLeft']) cube.position.x -= 0.1;
    }
    onLoad() {
        this.cube = getCube();

        window.addEventListener('keydown', (event) => {
            keysPressed[event.code] = true;
        });

        window.addEventListener('keyup', (event) => {
            keysPressed[event.code] = false;
        });
    }
}

export { InputManager };