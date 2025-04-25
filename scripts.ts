class Game{
    private _Board: Board;
    play(){
        Game.createBoard(this);
    }

    static createBoard(_Game:Game){
        _Game._Board = new Board();
    }
}

class Board{
    private _x:number = 10;
    private _y:number = 10;

    public get x():number{
        return this._x;
    }

    public get y():number{
        return this._y;
    }
}