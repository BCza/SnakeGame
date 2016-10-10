// Snake Class
var Snake = (function() 
{
    /************************************************  Constructors ************************************/
    function Snake() 
    {
        this._color = "Black";
    };

    function Snake(color,direction) 
    {
        this._color = color;
        this._direction = direction;
        this._length = 4;
        this._body = [];
        this._head = 0;
        this._tail = this._length; 
    };


    /************************************************  Setters/Getters ************************************/
    
    // Color
    this.getColor = function() {return this._color;};
    this.setColor = function(color) {this._color = color;};

    // Direction
    getDirection = function() {return this._color;};
    this.getDirection = function() {return this._color;};
    this.setDirection = function(direction) {this._direction = direction;};

    // Length
    getLength = function() {return this._length;};
    setLength = function(length) {this._length = length;};

    return Snake;
})();