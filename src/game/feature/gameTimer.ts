export class GameTimer {
    private duration: number; // en secondes
    private intervalId: number | null = null;
    private remaining: number;
    private onFinish: () => void;

    constructor(duration: number, onFinish: () => void) {
        this.duration = duration;
        this.remaining = duration;
        this.onFinish = onFinish;
    }

    public start(): void {
        const timerElement = document.getElementById("timer");
        if (!timerElement) return;

        timerElement.textContent = `Temps restant : ${this.remaining}s`;

        this.intervalId = window.setInterval(() => {
            this.remaining--;
            timerElement.textContent = `Temps restant : ${this.remaining}s`;

            if (this.remaining <= 0) {
                this.stop();
                this.onFinish();
            }
        }, 1000);
    }

    public stop(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public reset(): void {
        this.stop();
        this.remaining = this.duration;
    }
}
