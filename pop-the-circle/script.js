let counter;

const timedModeButton = document.querySelector("#timedMode");
timedModeButton.addEventListener("click", function() {
    changeScreens();
    counter = 0;
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    
    const display = document.querySelector("#display");

    function formatTime(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let mil = Math.floor((milliseconds / 10));
        
        seconds %= 60;
        mil %= 100;
      
        mil = Math.floor(mil / 10) * 10;

        let formattedTime = 
        ((seconds < 10 ? '0' : '') + seconds) + ':' + 
        ((mil < 10 ? '0' : '') + mil);

        return formattedTime;
    };

    function updateDisplay() {
        let currentTime = new Date().getTime();
        
        elapsedTime = currentTime - startTime;
        display.textContent = formatTime(elapsedTime);

        if (elapsedTime >= 30000) {
            stopStopwatch();
            callFrontScreen();
        };
    };

    function startStopwatch() {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateDisplay, 100);
    };

    function stopStopwatch() {
        clearInterval(timerInterval);
        elapsedTime = 0;
    };

    startStopwatch();
});

const endlessModeButton = document.querySelector("#endlessMode");
endlessModeButton.addEventListener("click", changeScreens);

function changeScreens() {
    const frontScreen = document.querySelector("#frontScreen");
    const gameContent = document.querySelector("#gameContent");

    gameContent.style.display = "block";
    frontScreen.style.display = "none";
};

const circle = document.querySelector("#circle");

let randY = Math.floor(Math.random() * 90);
let randX = Math.floor(Math.random() * 100);
let lastRandY = randY;
let lastRandX = randX;

circle.addEventListener("mouseenter", function() {
    playAudio();
    counter += 1;
    circle.style.top = `${randY}%`;
    circle.style.left = `${randX}%`;

    while (tooClose()) {
        randY = Math.floor(Math.random() * 85);
        randX = Math.floor(Math.random() * 90);
    };

    lastRandX = randX;
    lastRandY = randY;
});

function tooClose() {
    const closeX = Math.abs(randX - lastRandX) < 20;
    const closeY = Math.abs(randY - lastRandY) < 20;
    
    return closeX || closeY;
};

function playAudio() {
    const clickAudio = new Audio("click.mp3");
    clickAudio.play();
};

function callFrontScreen() {
    const frontScreen = document.querySelector("#frontScreen");
    const gameContent = document.querySelector("#gameContent");
    const pScoreText = document.querySelector("#pScoreText");
    const scoreText = document.querySelector("#scoreText");

    gameContent.style.display = "none";
    frontScreen.style.display = "block";
    pScoreText.style.display = "block";
    scoreText.textContent = counter;
};