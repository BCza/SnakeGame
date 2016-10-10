//Module Pattern
var drawModule = (function()
{
    
    var bodySnake = function(snake,x,y) 
    {
        // This is the single square
        ctx.fillStyle = snake.getDirection();
        ctx.fillRect(x*snakePixelSize, y*snakePixelSize, snakePixelSize, snakePixelSize);
        // This is the border of the square
        ctx.strokeStyle = snake.getColor();
        ctx.strokeRect(x*snakePixelSize, y*snakePixelSize, snakePixelSize, snakePixelSize);
    }

    var pizza = function(x, y) 
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
        var score_text = "Score: " + score;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 145, canvasHeight-5);
    }

    var createSnakeBody = function(snake1) 
    {
      var length = 4;

      for (var i = length-1; i>=0; i--) 
      {
          snake1._body.push({x:i, y:0});
      }  
    }
    
    var paint = function(SnakeBody)
    {
        //TODO: convert this to Draw Canvas function
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

        // TODO: Move this into only 1st time loading the canvas
        Start_Button.setAttribute('disabled', true);

        var snakeX = SnakeBody[0].x;
        var snakeY = SnakeBody[0].y;

        if (direction == 'right') 
        { 
            snakeX++; 
        }
        else if (direction == 'left') 
        { 
            snakeX--; 
        }
        else if (direction == 'up') 
        { 
            snakeY--; 
        } 
        else if(direction == 'down') 
        { 
            snakeY++; 
        }

        if (snakeX == -1 || snakeX == canvasWidth/snakePixelSize || snakeY == -1 || snakeY == canvasHeight/snakePixelSize || checkCollision(snakeX, snakeY, snake))
        {
            //restart game
            Start_Button.removeAttribute('disabled', true);

            ctx.clearRect(0,0,canvasWidth,canvasHeight);
            gameloop = clearInterval(gameloop);
            return;          
        }
        
        //TODO: Remake this function
        if(snakeX == food.x && snakeY == food.y) 
        {
            var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
            score ++; //TODO: Reset Score
            createFood(); //Create new food
        } 
        else 
        {
            var tail = snake.pop(); //pops out the last cell
            tail.x = snakeX; 
            tail.y = snakeY;
        }            
        
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++) 
        {
            bodySnake(snake[i].x, snake[i].y);
        } 
            
        pizza(food.x, food.y); 
        scoreText();
    }

    var createFood = function(snake1) 
    {
       // var snake1 = new Snake("Blue", EnumDir.DOWN);

        food = 
        {
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }

        for (var i=0; i>snake1.getLength; i++) 
        {
            var snakeX = snake1._body[i].x;
            var snakeY = snake[i].y;
        
            if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) 
            {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }


    // Check Snake Collision
    var checkSnakeCollision = function(snake,X,Y)
    {
        //Check for collisions with the snake itself
        for(i=0;i<snake.getLength();i++)
        {
            if(checkCollision(snake.body[i].X,snake.body[i].Y,X,Y))
            {
                return true;
            }
        }


        return false;
    }
    // TODO: Refactor Check Collision
    var checkCollision = function(x1, y1, x2,y2) 
    {
        // for(var i = 0; i < array.length; i++) 
        // {
        //     if(array[i].x === x && array[i].y === y)
        //     return true;
        // } 
        if(x1 == x2 && y1 == y2) return true;
        else return false;
    }

    var init = function()
    {
        // Player Object Variables
        var snake1 = new Snake("Blue", EnumDir.DOWN);
        var snake1 = new Snake("Blue", EnumDir.DOWN);
        
        createSnakeBody(snake1);
        createFood(snake1);
        gameloop = setInterval(paint(snake1), 80);
    }


    return {init : init};
        
}());
