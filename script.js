const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const box = 20;
let score = 0;
let snake = [{x: 9 * box, y: 10 * box}];
let food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
let d;

document.addEventListener("keydown", (e) => {
    if(e.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(e.keyCode == 38 && d != "DOWN") d = "UP";
    else if(e.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(e.keyCode == 40 && d != "UP") d = "DOWN";
});

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#2ecc71" : "#fff";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        document.getElementById("score").innerHTML = "Điểm: " + score;
        food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if(snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || snake.some((s, i) => i !== 0 && s.x === newHead.x && s.y === newHead.y)) {
        alert("Game Over!");
        location.reload();
    }

    snake.unshift(newHead);
}
setInterval(draw, 100);
