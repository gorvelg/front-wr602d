# The Greedy Fox — 3D Web Game

**The Greedy Fox** is an interactive 3D web game built with **Three.js**. The player controls a hungry fox who must collect as many coins as possible in 30 seconds. The project includes user authentication, a highscore leaderboard, and optional score sharing by email.

## Features

- 3D scene rendered with Three.js
- Fox character controlled via keyboard input
- Coin spawning and collection with sound feedback
- Real-time score display and countdown timer
- End-of-game screen with replay option
- User authentication (login/register) with token storage
- Highscore submission and leaderboard display
- Optional score sharing by email
- Responsive layout and interactive UI
- Audio manager and sound effects

## Technologies

- [Three.js](https://threejs.org/)
- TypeScript
- HTML / CSS
- API Platform (Symfony backend)
- JWT authentication
- Custom SoundManager
- REST microservice for mail delivery

## How to Run the Project

```bash
# Install with Vite
npm install --save-dev vite
npx vite

# or local serve(NodeJS)
npx serve
```

> The game will be accessible at `http://localhost:5173`

Make sure the backend API is available at `http://localhost:8319` and that CORS settings allow requests from the frontend domain.
