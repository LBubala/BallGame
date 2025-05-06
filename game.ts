import { Game } from './scripts.js';

declare global {
    interface Window {
        game: Game;
    }
}

window.game = new Game(document.querySelector('#Board') as HTMLCanvasElement);

document.querySelector('#StartGame').addEventListener('click', ()=>{
    window.game.play();
    Game.Main(window.game);
})

