import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { getScene, setFox } from "../globals/gameState";
import * as THREE from "three";

/**
 * Charge le modèle Fox.glb et retourne une promesse qui résout avec l'Object3D chargé.
 */
export function loadFox(): Promise<THREE.Object3D> {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            "/models/Fox.glb",
            (gltf) => {
                const fox = gltf.scene;
                fox.scale.set(0.02, 0.02, 0.02);
                getScene().add(fox);
                setFox(fox);
                console.log("Fox chargé :", fox);
                resolve(fox);
            },
            (progress) => {
                if (progress.total) {
                    const percent = (progress.loaded / progress.total) * 100;
                    console.log(`Chargement : ${percent.toFixed(2)}%`);
                } else {
                    console.log(`Chargement : ${progress.loaded} octets`);
                }
            },
            (error) => {
                console.error("Erreur de chargement du modèle Fox :", error);
                reject(error);
            },
        );
    });
}
