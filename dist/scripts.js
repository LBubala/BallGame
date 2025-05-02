export class Game {
    constructor() {
        console.log("Gra wystartowała!");
    }
    play() {
        console.log("GAME");
        Game.createBoard(this);
    }
    static createBoard(_Game) {
        _Game.Board = new Board();
    }
}
class Board {
    constructor() {
        this._x = 10;
        this._y = 10;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
}
