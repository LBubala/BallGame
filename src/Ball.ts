export class Ball{
    x: number;
    y: number;
    radius: number;
    color: string;
    velocityX: number;
    velocityY: number;
    gravity: number;
    bounce: number;
    mass: number;

    constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = Math.random() * 4 - 2;
        this.velocityY = Math.random() * 4 - 2;
        this.gravity = 0.5;
        this.bounce = 0.7;
        this.mass = radius * 0.1;
    }

    update(boardHeight: number, boardWidth: number) {
        this.velocityY += this.gravity; // Dodajemy grawitację
        this.x += this.velocityX;
        this.y += this.velocityY; // Aktualizujemy pozycję piłki

        // Odbicie od dolnej krawędzi
        if (this.y + this.radius > boardHeight) {
            this.y = boardHeight - this.radius;
            this.velocityY *= -this.bounce; // Odbicie z utratą energii
        }

        // Odbicie od ścian bocznych
        if (this.x - this.radius < 0 || this.x + this.radius > boardWidth) {
            this.velocityX *= -this.bounce; // Odbicie od lewej/prawej ściany
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}