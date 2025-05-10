import { createCanvas } from 'canvas';
import { Ball } from "./Ball.js";

const board = document.querySelector("#BoardCanvas") as HTMLCanvasElement;
const ctx = board.getContext('2d');

if (!ctx) {
    throw new Error("Nie udało się uzyskać kontekstu 2D!");
}

// Tworzymy piłkę
const ball = new Ball(board.width / 2, board.height / 2, 20, "red");

// Funkcja rysująca planszę
const drawBackground = () => {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, board.width, board.height);
};

const gridSize = 100; // Wielkość komórki siatki
const grid: Map<string, Ball[]> = new Map(); // Mapa przechowująca piłki w komórkach

// Funkcja dodająca piłkę do odpowiedniej komórki siatki
const addToGrid = (ball: Ball) => {
    const gridX = Math.floor(ball.x / gridSize);
    const gridY = Math.floor(ball.y / gridSize);
    const key = `${gridX},${gridY}`; // Klucz komórki

    if (!grid.has(key)) {
        grid.set(key, []);
    }
    grid.get(key)?.push(ball);
};

// Funkcja czyszcząca siatkę przed kolejną klatką
const clearGrid = () => {
    grid.clear();
};

const checkCollisionsInGrid = () => {
    grid.forEach((ballsInCell) => {
        for (let i = 0; i < ballsInCell.length; i++) {
            for (let j = i + 1; j < ballsInCell.length; j++) {
                checkCollision(ballsInCell[i], ballsInCell[j]);
            }
        }
    });
};

const checkCollision = (ball1: Ball, ball2: Ball) => {
    const dx = ball2.x - ball1.x;
    const dy = ball2.y - ball1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball1.radius + ball2.radius) {
        // Obliczamy kierunek normalny kolizji
        const normalX = dx / distance;
        const normalY = dy / distance;

        // Obliczamy różnicę prędkości
        const relativeVelocityX = ball2.velocityX - ball1.velocityX;
        const relativeVelocityY = ball2.velocityY - ball1.velocityY;

        // Obliczamy siłę odbicia (iloczyn skalarny)
        const speed = relativeVelocityX * normalX + relativeVelocityY * normalY;

        if (speed > 0) return; // Jeśli piłki się oddalają, nie odbijamy

        // Zamiana prędkości piłek
        const tempVelocityX = ball1.velocityX;
        const tempVelocityY = ball1.velocityY;

        ball1.velocityX = ball2.velocityX;
        ball1.velocityY = ball2.velocityY;

        ball2.velocityX = tempVelocityX;
        ball2.velocityY = tempVelocityY;
    }
};

const balls: Ball[] = [];

// Aktualizacja gry
const update = () => {
    ctx.clearRect(0, 0, board.width, board.height); // Czyści planszę
    drawBackground(); // Rysuje tło

    clearGrid(); // Czyścimy siatkę przed aktualizacją

    balls.forEach(ball => {
        ball.update(board.height, board.width);
        addToGrid(ball); // Dodajemy piłkę do siatki
        ball.draw(ctx);
    });

    console.log("Ilość piłek w update:", balls.length);

    requestAnimationFrame(update); // Płynna animacja
};
update();

const isMouseOverBall = (mouseX:number, mouseY:number, ball: Ball) => {
    const dx = mouseX - ball.x;
    const dy = mouseY - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy); // Oblicza odległość od środka piłki

    return distance < ball.radius; // Jeśli odległość jest mniejsza niż promień, kursor jest nad piłką
};

board.addEventListener("mousemove", (event) => {
    const rect = board.getBoundingClientRect(); // Pobiera pozycję canvas na stronie
    const mouseX = event.clientX - rect.left; // Pozycja X kursora względem canvas
    const mouseY = event.clientY - rect.top; // Pozycja Y kursora względem canvas

    balls.forEach(ball => {
        if (isMouseOverBall(mouseX, mouseY, ball)) {
            ball.color = "yellow"; // Zmiana koloru piłki
        } else {
            ball.color = "red"; // Powrót do normalnego koloru
        }
    })
});

board.addEventListener("click", (event) => {
    const rect = board.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    console.log("Dodaję piłkę na:", mouseX, mouseY);
    balls.push(
        new Ball(mouseX, mouseY, 20, "red")
    );
    console.log("Ilość piłek:", balls.length);
})