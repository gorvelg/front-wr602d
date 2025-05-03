async function fetchHighscores(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Vous devez être connecté pour voir les scores.");
        window.location.href = '/'; // Redirige vers login
        return;
    }

    try {
        const response = await fetch('http://localhost:8319/api/scores', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/ld+json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Erreur :", error);
            alert("Erreur lors de la récupération des scores.");
            return;
        }

        const data = await response.json();

        const listElement = document.getElementById('highscore-list')!;
        listElement.innerHTML = '';

        data.member.forEach((scoreEntry: any) => {
            const li = document.createElement('li');
            const date = new Date(scoreEntry.date).toLocaleString();
            li.textContent = `${scoreEntry.user ?? 'Utilisateur inconnu'} — ${scoreEntry.score} pts le ${date}`;
            listElement.appendChild(li);
        });

    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Impossible de charger les scores.");
    }
}

fetchHighscores();
