var Game = /** @class */ (function () {
    function Game() {
    }
    Game.play = function () {
    };
    Game.Test = function () {
        console.log("Test");
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
