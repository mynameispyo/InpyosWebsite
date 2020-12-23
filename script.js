document.addEventListener('DOMContentLoaded' , () => {
  let bird = document.querySelector('.bird');
  let ground = document.querySelector('.ground')
  let gameDisplay = document.querySelector('.game-container');

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 3;
  let gap = 450;
  isGameOver = false;

  function startGame(){
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
  }

  let gameTimer = setInterval(startGame, 20);

  startGame();

  function jump(){
    birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';
  }

  document.addEventListener('click', jump);

  function generateObstacle(){
    let obstacle = document.createElement('div');
    let topObstacle = document.createElement('div');

    if(!isGameOver){
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
    }
    let obstacleLeft = 500;
    let obstacleBottom = Math.random() * 60;    // 0 - 60

    obstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    topObstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.bottom = obstacleBottom + gap + 'px';

    // put its left on the right side of the sky (e.g. 500px)
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);

    // move it each time to the left (2px at each time)
    function moveObstacle(){
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + 'px';
      topObstacle.style.left = obstacleLeft + 'px';

      if(obstacleLeft < -60){
        clearInterval(obstacleTimer);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }

      // check whether game is over or not
      // MISSON: add another condition to check whether a bird is flying between obtacle and topObstacle
      if(birdBottom < 0){
        gameOver();
        clearInterval(obstacleTimer);
      }
      if(birdBottom < 0 || 
        (obstacleLeft + 60 > birdLeft && obstacleLeft < birdLeft+60 
          && (birdBottom < 300+obstacleBottom-150 || birdBottom + 45 > gap + obstacleBottom - 150)) 
        ){
        gameOver();
        clearInterval(obstacleTimer);
      }
    }

    let obstacleTimer = setInterval(moveObstacle, 20);
    if(!isGameOver) 
      setTimeout(generateObstacle, 3000);
  }

  generateObstacle();

  function gameOver(){
    console.log("Game Over");
    isGameOver = true;
    clearInterval(gameTimer);

    document.removeEventListener('click', jump);
  }
})