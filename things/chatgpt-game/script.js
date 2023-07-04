document.getElementById('startBtn').addEventListener('click', startGame);

function startGame() {
  var gameArea = document.getElementById('gameArea');
  var box = document.createElement('div');
  box.className = 'box';

  gameArea.appendChild(box);

  box.addEventListener('mouseover', moveBox);
}

function moveBox() {
  var gameArea = document.getElementById('gameArea');
  var box = document.querySelector('.box');

  var xPos = Math.floor(Math.random() * (gameArea.offsetWidth - box.offsetWidth));
  var yPos = Math.floor(Math.random() * (gameArea.offsetHeight - box.offsetHeight));

  box.style.left = xPos + 'px';
  box.style.top = yPos + 'px';
}