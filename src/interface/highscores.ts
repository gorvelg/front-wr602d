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

            const pseudo = scoreEntry.user?.pseudo ?? 'Utilisateur inconnu';
            const date = new Date(scoreEntry.date).toLocaleString();

            li.innerHTML = `
        <div class="score-user">${pseudo}</div>
        <div class="score-details">${scoreEntry.score} pts — ${date}</div>
    `;

            listElement.appendChild(li);
        });


    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Impossible de charger les scores.");
    }
}

fetchHighscores();

async function fetchHighscoresWithFilters(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Vous devez être connecté pour voir les scores.");
        window.location.href = '/';
        return;
    }

    const min = (document.getElementById('score-min') as HTMLInputElement).value;
    const max = (document.getElementById('score-max') as HTMLInputElement).value;
    const order = (document.getElementById('order') as HTMLSelectElement).value;

    let queryParams = `order[${order}]=${order === 'score' ? 'desc' : 'asc'}`;
    if (min && max) {
        queryParams += `&score[between]=${min}..${max}`;
    } else if (min) {
        queryParams += `&score[gte]=${min}`;
    } else if (max) {
        queryParams += `&score[lte]=${max}`;
    }

    try {
        const response = await fetch(`http://localhost:8319/api/scores?${queryParams}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/ld+json',
            },
        });

        const data = await response.json();

        const list = document.getElementById('highscore-list')!;
        list.innerHTML = '';

        data.member.forEach((entry: any) => {
            const li = document.createElement('li');
            const date = new Date(entry.date).toLocaleString();
            li.textContent = `${entry.user?.pseudo ?? 'Utilisateur'} — ${entry.score} pts le ${date}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur de chargement :", error);
    }
}

document.getElementById('apply-filters')?.addEventListener('click', fetchHighscoresWithFilters);

// Chargement initial
fetchHighscoresWithFilters();
