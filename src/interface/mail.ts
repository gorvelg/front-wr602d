export async function sendScoreEmail(score: number) {
    const to = (document.getElementById('email-to') as HTMLInputElement).value;
    const subject = 'Votre score au jeu';
    const message = `Bravo ! Vous avez obtenu un score de ${score} points.`;

    try {
        const response = await fetch('http://localhost:8319/microservice/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization-api-mailer': 'ggerggregeg'
            },
            body: JSON.stringify({ to, subject, message })
        });

        if (response.ok) {
            alert("Email envoyé !");
        } else {
            const error = await response.json();
            alert("Erreur lors de l'envoi : " + error.message);
        }
    } catch (err) {
        alert("Erreur réseau lors de l'envoi.");
        console.error(err);
    }
}
