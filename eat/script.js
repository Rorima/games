const square = document.querySelector("#square");
const food = document.querySelector("#food");
const speed = 2;
const interval = 1;

let x = 0;
let y = 0;

let squareHeight = 30;
let squareWidth = 30;

let wKeyPressed = false;
let sKeyPressed = false;
let aKeyPressed = false;
let dKeyPressed = false;

let timerIDLeft;
let timerIDRight;
let timerIDUp;
let timerIDDown;

randomizeFoodLocation();

window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case 'a':
            if (!aKeyPressed) {
                dKeyPressed = false;
                clearInterval(timerIDLeft);
                
                aKeyPressed = true;
                timerIDLeft = setInterval(() => {
                    goLeft();
                }, interval);
            };
            break;
        case 'd':
            if (!dKeyPressed) {
                aKeyPressed = false;
                clearInterval(timerIDRight);
                
                dKeyPressed = true;
                timerIDRight = setInterval(() => {
                    goRight();
                }, interval);
            };
            break;
        case 'w':
            if (!wKeyPressed) {
                sKeyPressed = false;
                clearInterval(timerIDDown);

                wKeyPressed = true;
                timerIDUp = setInterval(() => {
                    goUp();
                }, interval);
            };
            break;
        case 's':
            if (!sKeyPressed) {
                wKeyPressed = false;
                clearInterval(timerIDUp);

                sKeyPressed = true;
                timerIDDown = setInterval(() => {
                    goDown();
                }, interval);
            };
            break;
        default:
            break;
    };
});

window.addEventListener("keyup", function (event) {
    switch (event.key) {
        case 'a':
            aKeyPressed = false;
            clearInterval(timerIDLeft);
            break;
        case 'd':
            dKeyPressed = false;
            clearInterval(timerIDRight);
            break;
        case 'w':
            wKeyPressed = false;
            clearInterval(timerIDUp);
            break;
        case 's':
            sKeyPressed = false;
            clearInterval(timerIDDown);
        default:
            break;
    };
});

function checkCollision() {
    let rect1 = square.getBoundingClientRect();
    let rect2 = food.getBoundingClientRect();
  
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
};

function reachedBoundaries() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let rect = square.getBoundingClientRect();
    let allowedLeft = width - rect.width;
    let allowedHeight = height - rect.height;

    let traspassed = {
        left: rect.left <= -1,
        right: rect.left >= allowedLeft,
        top: rect.top <= -1,
        bottom: rect.top >= allowedHeight - 5,
    };

    return traspassed;
};

function randomizeFoodLocation() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let x = Math.floor(Math.random() * ((width - 30) - 10 + 1)) + 10;
    let y = Math.floor(Math.random() * ((height - 30) - 10 + 1)) + 10;

    food.style.left = x + "px";
    food.style.top = y + "px";
};

function growSquare() {
    playAudio();
    squareHeight += 10;
    squareWidth += 10;

    square.style.height = squareHeight + "px";
    square.style.width = squareWidth + "px";

    checkSquareGrowth();
};

function checkSquareGrowth() {
    if (square.style.height == "300px") {
        square.style.height = "30px";
        square.style.width = "30px";
        squareWidth = 30;
        squareHeight = 30;
    };
};

function goLeft() {
    traspassed = reachedBoundaries();
    if (!traspassed.left) {
        x -= speed;
        changeLeft();
        if (checkCollision()) {
            randomizeFoodLocation();
            growSquare();
        };
    };
};

function goRight() {
    traspassed = reachedBoundaries();
    if (!traspassed.right) {
        x += speed;
        changeLeft();
        if (checkCollision()) {
            randomizeFoodLocation();
            growSquare();
        };
    };
};

function goUp() {
    traspassed = reachedBoundaries();
    if (!traspassed.top) {
        if (goingDiagonal()) {
            y -= speed / 1.5;    
        } else {
            y -= speed;
        };
        changeTop();
        if (checkCollision()) {
            randomizeFoodLocation();
            growSquare();
        };
    };
};

function goDown() {
    traspassed = reachedBoundaries();
    if (!traspassed.bottom) {
        if (goingDiagonal()) {
            y += speed / 1.5;    
        } else {
            y += speed;
        };
        changeTop();
        if (checkCollision()) {
            randomizeFoodLocation();
            growSquare();
        };
    };
};

function changeLeft() {square.style.left = x + "px";};
function changeTop() {square.style.top = y + "px";};

function playAudio() {
    const clickAudio = new Audio("click.mp3");
    clickAudio.play();
};

function goingDiagonal() {
    return (
        wKeyPressed && aKeyPressed ||
        wKeyPressed && dKeyPressed ||
        sKeyPressed && aKeyPressed ||
        sKeyPressed && dKeyPressed
    );
};