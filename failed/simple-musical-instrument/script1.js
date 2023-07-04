// used for studying only

let audioContext = new AudioContext();
let activeSounds = {};

document.addEventListener('keydown', function(event) {
  if (!activeSounds[event.key]) {
    // Create and play the audio for the pressed key
    let audioSource = audioContext.createBufferSource();
    // Load the corresponding sound file based on the pressed key
    loadSound(event.key, function(buffer) {
      audioSource.buffer = buffer;
      audioSource.connect(audioContext.destination);
      audioSource.start();
    });
    activeSounds[event.key] = audioSource;
  }
});

document.addEventListener('keyup', function(event) {
  if (activeSounds[event.key]) {
    // Stop and remove the audio for the released key
    activeSounds[event.key].stop();
    delete activeSounds[event.key];
  }
});

// Function to load the sound file for each key
function loadSound(key, callback) {
  // Load and decode the sound file based on the key
  // Replace the following code with your own sound loading logic
  let soundFile = '';
  switch (key) {
    case 'A':
      soundFile = 'path/to/soundA.wav';
      break;
    case 'B':
      soundFile = 'path/to/soundB.wav';
      break;
    // Add more cases for other keys and their respective sound files
    // ...
    default:
      soundFile = '';
  }
}