import * as THREE from 'three';

export class SoundManager {
    private listener: THREE.AudioListener;
    private sounds: Map<string, THREE.Audio> = new Map();

    constructor(camera: THREE.Camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener); // Important : attacher au joueur ou caméra
    }

    async loadSound(name: string, path: string): Promise<void> {
        const sound = new THREE.Audio(this.listener);
        const loader = new THREE.AudioLoader();
        const buffer = await loader.loadAsync(path);
        sound.setBuffer(buffer);
        this.sounds.set(name, sound);
    }

    play(name: string): void {
        const sound = this.sounds.get(name);
        if (sound) {
            sound.isPlaying && sound.stop();
            sound.play();
        } else {
            console.warn(`Son "${name}" introuvable.`);
        }
    }
}
