export async function sendScoreToAPI(score: number): Promise<void> {
    const token = localStorage.getItem('token');

    if (!token) {
        console.warn("Aucun token trouvé, impossible d'envoyer le score.");
        return;
    }

    try {
        const response = await fetch('http://localhost:8319/api/scores/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ score })
        });

        if (!response.ok) {
            const err = await response.json();
            console.error('Erreur lors de l’envoi du score :', err);
        } else {
            console.log("Score enregistré avec succès !");
        }
    } catch (error) {
        console.error("Erreur réseau lors de l'envoi du score :", error);
    }
}
