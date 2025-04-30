import {checkAuthAndDisplayUI} from "./mainInterface";

export function setupLoginForm(onLoginSuccess: () => void): void {
    const form = document.getElementById('login-form') as HTMLFormElement;
    console.log('setupLoginForm', form);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = (document.getElementById('login-email') as HTMLInputElement).value;
        const password = (document.getElementById('login-password') as HTMLInputElement).value;

        const response = await fetch('http://localhost:8319/api/login_check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username, password
            })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            localStorage.setItem('token', data.token);
            alert('Connexion réussie !');

            checkAuthAndDisplayUI(); // cache les formulaires
            onLoginSuccess(); // déclenche init()
        } else {
            alert(data.message || 'Erreur de connexion');
        }
    });
}

export function setupRegisterForm(onRegisterSuccess: () => void): void {
    const form = document.getElementById('register-form') as HTMLFormElement;
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = (document.getElementById('register-username') as HTMLInputElement).value;
        const email = (document.getElementById('register-email') as HTMLInputElement).value;
        const password = (document.getElementById('register-password') as HTMLInputElement).value;

        const response = await fetch('http://localhost:8319/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/ld+json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
            showLoginForm(); // Redirige vers le formulaire de connexion
            onRegisterSuccess();
        } else {
            const error = await response.json();
            alert(error.message || "Erreur d'inscription");
        }
    });
}

function showLoginForm(): void {
    const loginContainer = document.getElementById('login-container') as HTMLElement;
    const registerContainer = document.getElementById('register-container') as HTMLElement;

    loginContainer.style.display = 'block';
    registerContainer.style.display = 'none';
}
