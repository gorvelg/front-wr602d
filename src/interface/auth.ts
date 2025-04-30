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