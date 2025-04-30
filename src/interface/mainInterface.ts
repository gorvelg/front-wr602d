import {setupLoginForm} from "./auth";

export function showGameOverMessage(): void {
    if (document.getElementById('game-over-message')) return;

const gameOverElement = document.createElement('div');
gameOverElement.innerHTML = 'Partie terminée ! Bravo !';
gameOverElement.style.position = 'block';
gameOverElement.id = 'game-over-message';
document.body.appendChild(gameOverElement);
}
export function checkAuthAndDisplayUI(): boolean {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    const loginContainer = document.getElementById('login-container') as HTMLElement;
    const registerContainer = document.getElementById('register-container') as HTMLElement;
    const hud = document.getElementById('hud') as HTMLElement;

    if (isAuthenticated) {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        hud.style.display = 'block';
    } else {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
        hud.style.display = 'none';
    }

    return isAuthenticated;
}

setupLoginForm(() => {})


