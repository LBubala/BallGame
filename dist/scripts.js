export class Game {
    constructor(GameFetcher) {
        this.Ball = new Ball();
        this._hasGameEnded = false;
        console.log("Gra wystartowała!");
        this._HTMLBoard = GameFetcher;
    }
    get hasGameEnded() {
        return this._hasGameEnded;
    }
    set hasGameEnded(ended) {
        this._hasGameEnded = ended;
    }
    static Main(game) {
        const main = setInterval(() => {
            // const ballPosition = document.querySelector('#Board > .column > .cell.ball') as HTMLElement;
            if (!game.hasGameEnded) {
                game.Ball.fallDown();
            }
            console.log('position Y: ' + game.Ball._positionY);
            if (game.Ball._positionY >= 9) {
                console.log('Game Ended!');
                clearInterval(main);
                game.hasGameEnded = true;
            }
        }, 1000);
    }
    play() {
        console.log("GAME!");
        Game.createBoard(this);
        this.Ball.renderBall(document.querySelector("#Board > .column[data-column='0'] > .cell[data-row='0']"));
        Game.Main(this);
    }
    static createBoard(_Game) {
        _Game.Board = new Board();
        _Game._HTMLBoard.innerHTML = Board.createBoard(_Game.Board.x, _Game.Board.y);
    }
}
class Board {
    constructor() {
        this._x = 10;
        this._y = 10;
    }
    static createBoard(axisX, axisY) {
        let HTMLBoard = '';
        for (let i = 0; i < axisX; i++) {
            HTMLBoard += `<div class="column" data-column="${i}">`;
            for (let j = 0; j < axisY; j++) {
                HTMLBoard += `<div class="cell" data-row="${j}"></div>`;
            }
            HTMLBoard += `</div>`;
        }
        return HTMLBoard;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
}
class Ball {
    constructor() {
        this._positionX = 0;
        this._positionY = 0;
    }
    renderBall(spawn) {
        // spawn.innerHTML = "<img id='Ball' alt='ball' src='ball.webp'/>";
        spawn.classList.add('ball');
    }
    fallDown() {
        if (document.querySelector('#Board > .column > .ball')) {
            document.querySelector('#Board > .column > .ball').classList.remove('ball');
        }
        this._positionY++;
        console.log('X: ' + this._positionX + ' || Y: ' + this._positionY);
        document.querySelector(`#Board > .column[data-column='${this._positionX}'] > .cell[data-row='${this._positionY}']`).classList.add('ball');
    }
}
