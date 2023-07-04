let audio = new Audio("myNote.mp3");

window.addEventListener("keydown", (event) => {
    audio.play();
});

window.addEventListener("keyup", (event) => {
    audio.pause();
    audio.currentTime = 0;
});