// Snake Class
var Snake = (function () {
  /************************************************  Constructors ************************************/
  function Snake() {
    this._color = "green";
  }

  function Snake(color, direction) {
    this._color = color;
    this._direction = direction;
    this._length = 4;
    this._body = [];
    this._head = 0;
    this._tail = this._length;
  }

  return Snake;
})();

