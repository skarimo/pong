let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 5
let ballSpeedY = 5
let paddle1Y = 250
let paddle2Y = 250
const paddleWidth = 10
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
    paddle1Y = mousePos.y - paddleHeight/2
  })
}

function drawEverything() {
  //canvas background
  colorRect(0,0,canvas.width,canvas.height, 'black');
  //user paddle 1
  colorRect(0,paddle1Y,paddleWidth,paddleHeight, 'white');
  //user paddle 2
  colorRect(canvas.width-paddleWidth,paddle2Y,paddleWidth,paddleHeight, 'white');
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

function ballReset() {
  ballSpeedX = -ballSpeedX
  ballX = canvas.width/2
  ballY = canvas.height/2
}

function computerMovement() {
  let paddle2YCenter = paddle2Y + (paddleHeight/2)
  if (paddle2YCenter < ballY-35) {
    paddle2Y += 6
  } else if (paddle2YCenter > ballY+35) {
    paddle2Y -= 6
  }
}

function moveEverything() {
  computerMovement()
  ballX += ballSpeedX
  ballY += ballSpeedY
  if(ballX > canvas.width-paddleWidth) {
    if ((ballY > paddle2Y) && ballY <= (paddle2Y+paddleHeight)) {
      ballSpeedX = -ballSpeedX
      let deltaY = ballY - (paddle2Y + paddleHeight/2)
      ballSpeedY = deltaY * 0.35
    }else {
      ballReset()
    }
  }
  if (ballX < paddleWidth) {
    if ((ballY > paddle1Y) && ballY <= (paddle1Y+paddleHeight)) {
      ballSpeedX = -ballSpeedX
      let deltaY = ballY - (paddle1Y + paddleHeight/2)
      ballSpeedY = deltaY * 0.35
    }else {
      ballReset()
    }
  }
  if (ballY < paddleWidth) {
    ballSpeedY = -ballSpeedY
  }
  if (ballY > canvas.height-10) {
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
