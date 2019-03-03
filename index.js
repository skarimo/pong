let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10
let ballSpeedY = 10
let paddle1Y = 250
const paddleHeight = 100

window.onload = function() {
  canvas = document.querySelector('#gameCanvas');
  canvasContext = canvas.getContext('2d');
  const framesPerSecond = 30
  setInterval(() => {
    moveEverything()
    drawEverything()
  }, 1000/framesPerSecond)

  canvas.addEventListener('mousemove', (e)=> {
    let mousePos = calculateMousePos(e)
    paddle1Y = mousePos.y
  })
}

function drawEverything() {
  //canvas background
  colorRect(0,0,canvas.width,canvas.height, 'black');
  //user paddle
  colorRect(0,paddle1Y,10,paddleHeight, 'white');
  //ball
  canvasContext.fillStyle = 'white';
  colorCircle(ballX,ballY,10, 'white');
}

function colorCircle(centerX,centerY,radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0, Math.PI*2, true);
  canvasContext.fill();
}

function colorRect(leftX,topY,width,height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}

function moveEverything() {
  ballX += ballSpeedX
  ballY += ballSpeedY
  if(ballX > canvas.width) {
    ballSpeedX = -ballSpeedX
  }
  if (ballX < 0) {
    ballSpeedX = -ballSpeedX
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY
  }
}

function calculateMousePos(e) {
  let rect = canvas.getBoundingClientRect()
  let root = document.documentElement
  let mouseX = e.clientX - rect.left - root.scrollLeft
  let mouseY = e.clientY - rect.top - root.scrollTop

  return {
    x: mouseX,
    y: mouseY
  };
}
