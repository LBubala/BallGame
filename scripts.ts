export class Game{
    private Board: Board;
    public _HTMLBoard: HTMLElement;
    public Ball: Ball= new Ball();

    constructor(GameFetcher: HTMLElement){
        console.log("Gra wystartowała!");
        this._HTMLBoard = GameFetcher;
    }

    play(){
        console.log("GAME!");
        Game.createBoard(this);
        this.Ball.renderBall(document.querySelector("#Board > .column[data-column='0'] > .cell[data-row='0']"));
    }

    static createBoard(_Game:Game){
        _Game.Board = new Board();
        _Game._HTMLBoard.innerHTML = Board.createBoard(_Game.Board.x, _Game.Board.y);
    }
}

class Board{
    private _x:number = 10;
    private _y:number = 10;

    static createBoard(axisX:number, axisY:number):string{
        let HTMLBoard = '';
        for(let i=0; i<axisX; i++){
            HTMLBoard += `<div class="column" data-column="${i}">`;
            for(let j=0; j<axisY; j++){
                HTMLBoard += `<div class="cell" data-row="${j}"></div>`;
            }
            HTMLBoard += `</div>`;
        }
        return HTMLBoard;
    }

    public get x():number{
        return this._x;
    }

    public get y():number{
        return this._y;
    }
}

class Ball{
    renderBall(spawn:HTMLElement){
        // spawn.innerHTML = "<img id='Ball' alt='ball' src='ball.webp'/>";
        spawn.classList.add('ball');
    }
}