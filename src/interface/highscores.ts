import { logout } from "./auth";


// async function fetchHighscores(): Promise<void> {
//     const token = localStorage.getItem("token");
//     if (!token) {
//         alert("Vous devez être connecté pour voir les scores.");
//         window.location.href = "/";
//         return;
//     }
//
//     try {
//         const response = await fetch("http://localhost:8319/api/scores", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/ld+json",
//             },
//         });
//
//         if (!response.ok) {
//             const error = await response.json();
//             console.error("Erreur :", error);
//             alert("Erreur lors de la récupération des scores.");
//             return;
//         }
//
//         const data = await response.json();
//
//         const list = document.getElementById("highscore-list")!;
//         list.innerHTML = "";
//
//         data.member.forEach((scoreEntry: any, index: number) => {
//             const li = document.createElement("li");
//
//             const pseudo = scoreEntry.user?.pseudo ?? "Utilisateur inconnu";
//             const date = new Date(scoreEntry.date).toLocaleString();
//             const position = index + 1;
//
//             li.innerHTML = `
//                 <div class="score-position">#${position}</div>
//                 <div class="score-user">${pseudo}</div>
//                 <div class="score-details">${scoreEntry.score} pts — ${date}</div>
//             `;
//
//             list.appendChild(li);
//         });
//     } catch (error) {
//         console.error("Erreur réseau :", error);
//         alert("Impossible de charger les scores.");
//     }
// }

async function fetchHighscoresWithFilters(): Promise<void> {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Vous devez être connecté pour voir les scores.");
        window.location.href = "/";
        return;
    }

    const min = (document.getElementById("score-min") as HTMLInputElement).value;
    const max = (document.getElementById("score-max") as HTMLInputElement).value;
    const order = (document.getElementById("order") as HTMLSelectElement).value;

    let queryParams = `order[${order}]=${order === "score" ? "desc" : "asc"}`;
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
                Authorization: `Bearer ${token}`,
                Accept: "application/ld+json",
            },
        });

        const data = await response.json();

        const list = document.getElementById("highscore-list")!;
        list.innerHTML = "";

        data.member.forEach((scoreEntry: any, index: number) => {
            const li = document.createElement("li");

            const pseudo = scoreEntry.user?.pseudo ?? "Utilisateur inconnu";
            const date = new Date(scoreEntry.date).toLocaleString();
            const position = index + 1;

            const crownSvg = `
        <svg height="48px" width="48px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 512.001 512.001" xml:space="preserve">
<path style="fill:#FFC033;" d="M470.039,208.919l-32.946,131.784l-7.791,30.943l-17.92,71.68c-0.111,0.669-0.557,1.113-0.667,1.781
\tl-0.111,0.111H101.399c-0.221-0.668-0.667-1.224-0.778-1.892l-17.922-71.68l-7.791-30.943L41.962,208.919
\tc-2.226-8.904,3.228-17.92,12.132-20.146c2.116-0.557,4.23-0.668,6.232-0.334c0.557-1.892,1.337-3.562,2.561-5.12
\tc5.565-7.346,16.029-8.793,23.374-3.228l93.606,71.123l48.196-120.654c3.452-8.57,13.244-12.689,21.704-9.35
\tc2.56,1.002,4.563,2.56,6.234,4.452c1.67-1.892,3.785-3.45,6.234-4.452c8.57-3.339,18.253,0.778,21.704,9.35l48.196,120.654
\tl93.606-71.123c7.345-5.565,17.809-4.118,23.374,3.228c1.224,1.558,2.005,3.228,2.561,5.12c2.002-0.334,4.117-0.223,6.232,0.334
\tC466.81,190.999,472.263,200.015,470.039,208.919z"/>
    <path style="fill:#F9A926;" d="M410.602,445.218l0.111-0.111c0.11-0.668,0.555-1.113,0.667-1.781l17.921-71.679l7.791-30.943
\tl32.946-131.784c2.226-8.904-3.228-17.92-12.132-20.146c-2.116-0.557-4.23-0.668-6.232-0.334c-0.557-1.892-1.337-3.562-2.561-5.12
\tc-5.565-7.346-16.029-8.793-23.374-3.228l-93.606,71.123l-48.196-120.655c-3.452-8.57-13.133-12.689-21.704-9.35
\tc-2.449,1.002-4.563,2.56-6.234,4.452v319.555H410.602z"/>
    <path style="fill:#D7EBFF;" d="M429.24,456.348H84.196c-9.217,0-16.696-7.473-16.696-16.696c0-9.223,7.479-16.696,16.696-16.696
\tH429.24c9.217,0,16.696,7.473,16.696,16.696C445.936,448.875,438.457,456.348,429.24,456.348z"/>
    <path style="fill:#BDDEFF;" d="M256,456.348h173.24c9.217,0,16.696-7.473,16.696-16.696c0-9.223-7.479-16.696-16.696-16.696H256
\tV456.348z"/>
    <path style="fill:#D7EBFF;" d="M237.191,356.175c0,8.57-6.902,15.471-15.472,15.471H82.699l-7.791-30.943h146.809
\tC230.288,340.703,237.191,347.604,237.191,356.175z"/>
    <path style="fill:#BDDEFF;" d="M437.092,340.703l-7.791,30.943H288.5c-8.569,0-15.47-6.902-15.47-15.471
\tc0-8.57,6.901-15.471,15.47-15.471H437.092z"/>
    <path style="fill:#FFC033;" d="M426.52,207.962c-19.529-19.529-19.529-51.304,0-70.834c19.529-19.529,51.303-19.529,70.834,0
\ts19.529,51.304,0,70.834S446.049,227.492,426.52,207.962z"/>
    <g>
\t<path style="fill:#FFD066;" d="M14.648,137.083c19.529-19.529,51.304-19.529,70.834,0s19.529,51.304,0,70.834
\t\ts-51.304,19.529-70.834,0S-4.883,156.613,14.648,137.083z"/>
        <circle style="fill:#FFD066;" cx="256" cy="105.74" r="50.087"/>
</g>
    <path style="fill:#FFC033;" d="M306.087,105.74c0-27.662-22.423-50.087-50.087-50.087v100.174
\tC283.664,155.827,306.087,133.402,306.087,105.74z"/>
    <circle style="fill:#F26D76;" cx="256" cy="356.175" r="50.087"/>
    <path style="fill:#E65C64;" d="M306.087,356.175c0-27.662-22.423-50.087-50.087-50.087v100.174
\tC283.664,406.261,306.087,383.837,306.087,356.175z"/>
</svg>
    `;

            li.innerHTML = `
        <div class="score-position">#${position} ${index === 0 ? crownSvg : ""}</div>
        <div class="score-user">${pseudo}</div>
        <div class="score-details">${scoreEntry.score} pts — ${date}</div>
    `;

            list.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur de chargement :", error);
    }
}

document.getElementById("apply-filters")?.addEventListener("click", fetchHighscoresWithFilters);

// Chargement initial
fetchHighscoresWithFilters();

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector(".logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});
