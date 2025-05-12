export async function sendScoreEmail(score: number) {
    const to = (document.getElementById('email-to') as HTMLInputElement).value;
    const subject = 'Votre score au jeu';
    const message = `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; color: #333;">
    <h2 style="color: #f77f00;">🦊 The Greedy Fox - Résultat de partie</h2>
    <p><strong>Votre ami</strong> vient de terminer une partie endiablée de <em>The Greedy Fox</em> !</p>
    <p style="font-size: 18px; background-color: #fff3cd; padding: 10px 15px; border-radius: 8px; border: 1px solid #ffeeba;">
     Score obtenu : <strong style="color: #28a745; font-size: 22px;">${score} points</strong>
    </p>
    <p>Vous pensez pouvoir faire mieux ? À vous de jouer !</p>
    <a href="http://localhost:5173" style="display: inline-block; margin-top: 20px; background-color: #f77f00; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
      Lancer le jeu
    </a>
    <p style="margin-top: 30px; font-size: 12px; color: #999;">Ce message a été envoyé automatiquement depuis le jeu The Greedy Fox.</p>
  </div>
`;

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
