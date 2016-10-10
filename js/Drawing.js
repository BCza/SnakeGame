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

    var createSnakeBody = function(snake1) 
    {
      for (var i = 0; i < snake1._length; i++) 
          snake1._body.push({X:i, Y:0});
    }
    
    var DrawCanvas = function()
    {
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
    }

    var paint = function(snake)
    {
        var snakeX = snake._body[0].X;
        var snakeY = snake._body[0].Y;

        if (snake._direction == EnumDir.RIGHT) {snakeX++;}
        else if (snake._direction == EnumDir.LEFT){snakeX--;}
        else if (snake._direction == EnumDir.UP){snakeY--;} 
        else if(snake._direction == EnumDir.DOWN){ snakeY++;}

        // If the snake hits anything
        // if (snakeX == -1 || snakeX == canvasWidth/snakePixelSize || snakeY == -1 || snakeY == canvasHeight/snakePixelSize || checkSnakeCollision(snake, snakeY, snakeX))
        // {
        //     //restart game
        //     Start_Button.removeAttribute('disabled', true);

        //     // Close out current objects
        //     ctx.clearRect(0,0,canvasWidth,canvasHeight);
        //     gameLoop = clearInterval(gameLoop);

        //     return;          
        // }
        
        //TODO: Remake this function
        // If the snake hits the food
        if(snakeX == food.x && snakeY == food.y) 
        {
            var currentlength = snake._length
            var newTail = 
            {
                X:snake._body[currentlength].X + 1,
                Y:snake._body[currentlength].Y + 1
            }

            snake._body.push(newTail);

            score ++; //TODO: Reset Score
            createFood(); //Create new food
        } 

       // Draw Snake and Food
       DrawCanvas();
       drawSnakeBody(snake)
       drawPizza(food.X, food.Y); 
       
       // Show Updated Score
       scoreText();
    }

    var createFood = function(snake1) 
    {   
            if (checkCollision(snake1._body[0].X,snake1._body[0].Y,food.X,food.Y)) 
            {
                // Create New food
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
            else
            {
                
            }
    }


    // Check Snake Collision
    var checkSnakeCollision = function(snake,X,Y)
    {
        //Check for collisions with the snake itself
        for(i=0;i<snake._length;i++)
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
        if(x1 == x2 && y1 == y2) return true;
        else return false;
    }

    var init = function()
    {
        // Player Object Variables
        var snake1 = new Snake("Blue", EnumDir.DOWN);

        // Calculate the points for the initial values
        createSnakeBody(snake1);
        createFood(snake1);
        
        // Disable until the game ends
        Start_Button.setAttribute('disabled', true);
        paint(snake1);
        //gameLoop = setInterval(paint(snake1), 80);
    }


    return {init : init};
        
}());
