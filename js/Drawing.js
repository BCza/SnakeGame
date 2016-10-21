//Module Pattern
var drawModule = (function()
{
    var drawSingleSnakeUnit = function(snake,pt) 
    {
        // This is the single square
        ctx.fillStyle = snake._color;
        ctx.fillRect(pt.X * snakePixelSize, pt.Y * snakePixelSize, snakePixelSize, snakePixelSize);

        // This is the border of the square
        ctx.strokeStyle = snake._color;
        ctx.strokeRect(pt.X * snakePixelSize, pt.Y * snakePixelSize, snakePixelSize, snakePixelSize);
    }

    var drawSnakeBody = function(snake)
    {
        for(var i=0; i<snake._length;i++)
            drawSingleSnakeUnit(snake,snake._body[i])
    }

    var drawPizza = function(x, y) 
    {
        // This is the border of the pizza
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakePixelSize, y*snakePixelSize, snakePixelSize, snakePixelSize);
        // This is the single square 
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakePixelSize+1, y*snakePixelSize+1, snakePixelSize-2, snakePixelSize-2);
    }

    var scoreText = function() 
    {
        // How many pizzas did the snake eat
        var score_text = "Score: " + P1Score;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 145, canvasHeight-5);
    }

    var changeDir = function(player,direction)
    {
        Players[player]._direction = direction;
    }

    var createSnakeBody = function(snake1) 
    {
      for (var i = snake1._length; i > 0 ; i--) 
          snake1._body.push({X:0, Y:i});
    }

    var createNewTail = function(snake)
    {
        var newTail = {};
        var snakeX = snake._body[snake._length-1].X;
        var snakeY = snake._body[snake._length-1].Y;
        switch(snake._direction)
        {
            case EnumDir.DOWN:
                newTail =  {X:snakeX,Y:snakeY++};
                break;
            case EnumDir.UP:
                newTail = {X:snakeX,Y:snakeY--};
                break;
            case EnumDir.LEFT:
                newTail = {X:snakeX--,Y:snakeY};
                break;
            case EnumDir.RIGHT:
                newTail = {X:snakeX++,Y:snakeY};
                break;
        }
        snake._body.push(newTail);
    }
    var DrawCanvas = function()
    {
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
    }

    var snakeHitWall = function(snake){
        if(snake._body[0].X < 0 || snake._body[0].X > 40 || snake._body[0].Y < 0  || snake._body[0].Y > 40)
            return true;
        else 
            return false;
    }

    var EndGame = function()
    {
        gameLoop = null;
    }

    var paint = function(snake)
    {
        // Grab the old coordinates of the head
        var oldHeadPosX = snake._body[0].X;
        var oldHeadPosY = snake._body[0].Y;

        // Move the head of the snake depending on the direction
        switch(snake._direction)
        {
            case(EnumDir.RIGHT):
                snake._body[0].X++;
                break; 
            case(EnumDir.LEFT):
                snake._body[0].X--;
                break;
            case(EnumDir.UP):
                snake._body[0].Y--;
                break;
            case(EnumDir.DOWN):
                snake._body[0].Y++;
                break;
            default:
                break;
        }

        // Check if it hit itself or the wall
        if(checkSnakeCollision(snake,snake._body[0].X,snake._body[0].Y) || snakeHitWall(snake))
        {
             console.log("GAMEOVER");
             Start_Button.removeAttribute('disabled', true);
             ctx.clearRect(0,0,canvasWidth,canvasHeight);
             Players = [];
             clearInterval(gameLoop);
        }

        // Check if the snake hits the Food
        if(checkCollision(snake._body[0].X,snake._body[0].Y,food.X,food.Y))
        {
            createNewTail(snake);
            snake._length = snake._length + 1;
            P1Score++; //TODO: Reset Score
            createNewFood(); //Create new food
        }

        

        // Have the body of the snake follow the head
        for( var i = snake._length-1;i>1;i--)
        {
            snake._body[i].X = snake._body[i-1].X;
            snake._body[i].Y = snake._body[i-1].Y;
        }

        // Move the last piece to follow the head
        snake._body[1].X = oldHeadPosX;
        snake._body[1].Y = oldHeadPosY;

       // Draw Snake and Food
       DrawCanvas();
       drawSnakeBody(snake)
       drawPizza(food.X, food.Y); 

       // Show Updated Score
       scoreText();
    }

    var createNewFood = function() 
    {
        // Create New food
        food.X = Math.floor((Math.random() * 30) + 1);
        food.Y = Math.floor((Math.random() * 30) + 1);
    }


    // Check Snake Collision
    var checkSnakeCollision = function(snake,X,Y)
    {
        //Check for collisions with the snake itself
        for(var i=1;i<snake._length;i++)
        {
            if(checkCollision(snake._body[i].X,snake._body[i].Y,X,Y))
            {
                return true;
            }
        }
        return false;
    }
    
    // TODO: Refactor Check Collision
    var checkCollision = function(x1, y1, x2,y2) 
    {
        return (x1 == x2 && y1 == y2);
    }

    var init = function()
    {
        // Player Object Variables
        var snake1 = new Snake("Yellow", EnumDir.DOWN);

        // Calculate the points for the initial values
        createSnakeBody(snake1);
        createNewFood();

        // Push into the player array
        Players.push(snake1);

        // Disable until the game ends
        Start_Button.setAttribute('disabled', true);

        // Start the game!
        gameLoop = setInterval(function(){paint(snake1);}, 80);
    }


    return {
        init : init,
    };
        
}());
