const gravity = 0.05;
velocity = 0.2;
gameDisplay = document.querySelector("#game_win");
let gap = 750;
is_playing = true;
let birdLeft = 220;
let birdBottom = 0;
obstacle_arr = [];
window_width = window.innerWidth;
window_height = window.innerHeight;




function moveBird() {
    screenBottom = document.getElementById('game_win').getBoundingClientRect().bottom
    var bird = document.getElementById("bird");
    var pos = screenBottom/2;
    birdBottom = 0;
    function animate() {
        pos += velocity;
        velocity += gravity;
        bird.style.top = pos + "px";
        birdBottom = pos + 40
        if (pos >= screenBottom - 100 || !is_playing) {
            player_lost();
            is_playing = false;
            return; // player lost
           
        }
        requestAnimationFrame(animate); // Continue the animation
    }

    requestAnimationFrame(animate); // Start the animation
}



document.addEventListener('click', function(event) {
    var bird = document.getElementById('bird');
    velocity = -4;
});






function generateObstacle() {
   
    if (!is_playing)
    {
        clearInterval(pipe_generation_interval);
        return;
    }
    var bird_props = document.getElementById("bird").getBoundingClientRect();
    var offsets = document.getElementById('game_win').getBoundingClientRect();
    var top = offsets.top;
    var left = offsets.left;

    let obstacleLeft = offsets.width;
    let randomHeight = Math.floor(Math.random() * (700 - 300 + 1)) + 300;
    console.log(randomHeight);
    let obstacleBottom = (randomHeight / 919) * window_height;
    console.log(obstacleBottom);
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');

    obstacle.classList.add('obstacle');
    topObstacle.classList.add('topObstacle');

    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.left = obstacleLeft + 'px';
    obstacle.style.top = obstacleBottom + 'px';
    topObstacle.style.top = obstacleBottom - gap + 'px';


    function moveObstacle() {
        obstacleLeft -= 1.5;
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';

        if (obstacleLeft < bird_props.left - bird_props.width - 400|| !is_playing) {
            if (is_playing)
            {
                var score = document.getElementById("score");
                current_score = parseInt(score.innerHTML);
                score.innerHTML = current_score + 1
            }
            clearInterval(timerId);
            gameDisplay.removeChild(obstacle);
            gameDisplay.removeChild(topObstacle);
        }
       
        if (bird_props.right > obstacleLeft +475/1920 * window_width && (bird_props.left < obstacleLeft + 500/1920 * window_width))
        {
            if(!(birdBottom < obstacleBottom && birdBottom > obstacleBottom - 250/919 * window_height))
            {
                is_playing = false;
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
                return;
            }
        }
    }
    let timerId = setInterval(moveObstacle, 0.5);
    obstacle_arr.push(timerId);
   
}

function player_lost()
{
    var lose_div = document.createElement('div');
    lose_div.id = 'loseDiv'
    var lose_text = document.createElement('p');
    var score_text = document.createElement('p');
    lose_text.innerHTML = "You are cooked!"
    score_text.innerHTML = "Score: " + document.getElementById("score").innerHTML;
    lose_text.className = 'lose';
    score_text.className = 'lose';
    
    lose_div.appendChild(lose_text);
    lose_div.appendChild(score_text);

    gameDisplay.appendChild(lose_div);

    clearInterval(pipe_generation_interval);
    clearObstacles();
    show_button();
    
}

function hideButton() {
    document.getElementById('start').style.visibility = 'hidden';
}

function clearObstacles() {
    obstacle_arr.forEach(timerId => clearInterval(timerId));
    obstacle_arr = [];
    const obstacles = document.querySelectorAll('.obstacle, .topObstacle');
    obstacles.forEach(obstacle => obstacle.remove());
}

function show_button()
{
    document.getElementById('start').style.visibility = 'visible'; // Make the start button visible again
}

function start_game()
{   
    
    window_width = window.innerWidth;
    window_height = window.innerHeight;
    console.log(window_width);
    console.log(window_height);
	try{
        gameDisplay.removeChild(document.getElementById('loseDiv'));
    }
    catch{

    }
    document.getElementById("score").innerHTML = 0;
    is_playing = true;
    moveBird(); // Call the function to start moving the bird
    hideButton();
    pipe_generation_interval = setInterval(generateObstacle, 2000);
}