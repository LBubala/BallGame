export class Game {
    constructor(GameFetcher) {
        this.Ball = new Ball();
        console.log("Gra wystartowała!");
        this._HTMLBoard = GameFetcher;
    }
    play() {
        console.log("GAME!");
        Game.createBoard(this);
        this.Ball.renderBall(document.querySelector("#Board > .column[data-column='0'] > .cell[data-row='0']"));
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
    renderBall(spawn) {
        // spawn.innerHTML = "<img id='Ball' alt='ball' src='ball.webp'/>";
        spawn.classList.add('ball');
    }
}
