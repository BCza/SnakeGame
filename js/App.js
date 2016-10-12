(function (window, document, drawModule, undefined) {

var Start_Button = document.getElementById('Start_Button');
Start_Button.addEventListener("click", function(){ drawModule.init();});

	document.onkeydown = function(event) {

        keyCode = window.event.keyCode; 
        keyCode = event.keyCode;

        switch(keyCode) {
        
        case 37: 
          if (Players[0]._direction != EnumDir.LEFT) 
            Players[0]._direction = EnumDir.LEFT;
          console.log('left'); 
          break;

        case 39:
          if (Players[0]._direction != EnumDir.RIGHT) 
            Players[0]._direction = EnumDir.RIGHT;
          console.log('Right'); 
          break;

        case 38:
          if (Players[0]._direction != EnumDir.UP) 
            Players[0]._direction = EnumDir.UP;
          console.log('UP'); 
          break;

        case 40:
          if (Players[0]._direction != EnumDir.DOWN) 
            Players[0]._direction = EnumDir.DOWN;
          console.log('Down'); 
          break;
          }
      }


})(window, document, drawModule);