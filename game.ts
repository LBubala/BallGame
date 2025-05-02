import { Game } from './scripts.js';

declare global {
    interface Window {
        game: Game;
    }
}

window.game = new Game();
