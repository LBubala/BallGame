var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.play = function () {
        Game.createBoard(this);
    };
    Game.createBoard = function (_Game) {
        _Game._Board = new Board();
    };
    return Game;
}());
var Board = /** @class */ (function () {
    function Board() {
        this._x = 10;
        this._y = 10;
    }
    Object.defineProperty(Board.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });
    return Board;
}());
