//Global Variables
var mycanvas = document.getElementById('Canvas');
var ctx = mycanvas.getContext('2d');
var canvasWidth = 400;
var canvasHeight = 400;
var P1Score = 0;
var P2Score = 0;
var snakePixelSize = 10; 
var food = {X:10,Y:10};
var gameLoop = null;

// Direction Enum
var EnumDir =
{
    UP:0,
    DOWN:1,
    LEFT:2,
    RIGHT:3
};





