let audio = new Audio("myNote.mp3");
let activeSounds = {};

window.addEventListener("keydown", (event) => {
    if (!activeSounds[event.key]) {
        audio.play();
    };
    activeSounds[event.key] = audio;
    //console.log(activeSounds[event.key]);
});

document.addEventListener('keyup', (event) => {
    console.log(activeSounds[event.key]);
    if (activeSounds[event.key]) {
      // Stop and remove the audio for the released key
      activeSounds[event.key].pause();
      activeSounds[event.key].currentTime = 0;
      delete activeSounds[event.key];
    }
  });