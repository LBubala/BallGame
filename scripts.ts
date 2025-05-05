export class Game{
    private Board: Board;
    public _HTMLBoard: HTMLElement;
    public Ball: Ball= new Ball();
    private _hasGameEnded: boolean = false;

    constructor(GameFetcher: HTMLElement){
        console.log("Gra wystartowała!");
        this._HTMLBoard = GameFetcher;
    }

    get hasGameEnded(): boolean{
        return this._hasGameEnded;
    }

    set hasGameEnded(ended: boolean){
        this._hasGameEnded = ended;
    }

    static Main(game: Game){
        const main = setInterval(() => {
            // const ballPosition = document.querySelector('#Board > .column > .cell.ball') as HTMLElement;
            if(!game.hasGameEnded){
                game.Ball.fallDown();
            }

            if(game.Ball._positionY >= 9){
                console.log('Game Ended!')
                clearInterval(main);
                game.hasGameEnded = true;
            }
        }, 1000)
    }

    play(){
        console.log("GAME!");
        Game.createBoard(this);
        this.Ball.renderBall(document.querySelector("#Board > .column[data-column='0'] > .cell[data-row='0']"));
        // Game.Main(this);
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
    public _positionX:number = 0;
    public _positionY:number = 0;

    renderBall(spawn:HTMLElement){
        // spawn.innerHTML = "<img id='Ball' alt='ball' src='ball.webp'/>";
        spawn.classList.add('ball');
    }

    fallDown(){
        if(document.querySelector('#Board > .column > .ball')){
            document.querySelector('#Board > .column > .ball').classList.remove('ball');
        }
        this._positionY++;
        document.querySelector(`#Board > .column[data-column='${this._positionX}'] > .cell[data-row='${this._positionY}']`).classList.add('ball');
    }
}