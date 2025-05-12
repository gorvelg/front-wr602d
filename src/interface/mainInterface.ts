import {setupLoginForm} from "./auth";
import { logout } from './auth';
import {sendScoreEmail} from "./mail";

export function showGameOverMessage(score: number): void {
    if (document.getElementById('game-over-message')) return;

    const gameOverElement = document.createElement('div');
    gameOverElement.id = 'game-over-message';
    gameOverElement.className = 'game-over';

    gameOverElement.innerHTML = `
        <div class="game-over-heading">Game Over</div>
        <p>Score final : ${score}</p>
        <button id="replay-btn">Rejouer</button>
    `;

    document.body.appendChild(gameOverElement);

    const button = document.getElementById('replay-btn') as HTMLButtonElement;
    button.addEventListener('click', () => window.location.reload());
}

export function showEmailSentMessage(score: number): void {
    const emailForm = document.getElementById('email-form')!;
    emailForm.style.display = 'block';

    document.getElementById('send-score-email')?.addEventListener('click', () => {
        sendScoreEmail(score);
    });
}

export function checkAuthAndDisplayUI(): boolean {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    const loginContainer = document.getElementById('login-container') as HTMLElement;
    const registerContainer = document.getElementById('register-container') as HTMLElement;
    const hud = document.getElementById('score-hud') as HTMLElement;
    const timer = document.querySelector('.time-hud') as HTMLElement;
    const logoutBtn = document.querySelector('.hub-item.logout') as HTMLElement;

    if (isAuthenticated) {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        timer.style.display = 'block';
        hud.style.display = 'block';
        logoutBtn.style.display = 'block';
    } else {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
        timer.style.display = 'none';
        hud.style.display = 'none';
        logoutBtn.style.display = 'none';
    }

    return isAuthenticated;
}

setupLoginForm(() => {})

function setupAuthToggle(): void {
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const loginContainer = document.getElementById('login-container') as HTMLElement;
    const registerContainer = document.getElementById('register-container') as HTMLElement;

    showRegisterBtn?.addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    showLoginBtn?.addEventListener('click', () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });
}

setupAuthToggle();

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('.hub-item.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});






