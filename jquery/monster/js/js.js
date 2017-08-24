/*Variable Image*/
var imgBackground = new Image();
var imgHeart = new Image();
var imgPause = new Image();
var imgRestart = new Image();
var imgStop = new Image();
var imgBoom = new Image();
var imgPlay = new Image();
var imgOver = new Image();
var imgSuprise = new Image();
/*Path Image*/
imgBackground.src = "img/background.jpg";
imgHeart.src = "img/heart.png";
imgPause.src = "img/pause.png";
imgRestart.src = "img/restart.png";
imgStop.src = "img/stop.png";
imgBoom.src = "img/boom.png";
imgPlay.src = "img/play.png";
imgOver.src = "img/gameover.jpg";
imgSuprise.src = "img/suprise.png"
/*Variable canvas and initialization context 2d*/
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var imgMonster = new Image();
imgMonster.src = "img/1.png";
canvas.width = 500;
canvas.height = 600;
/*Check status game*/
var _runningGame = false;
var _stop;
var _pause;
/**
* Variable heart, array monster, speed of monster, score, time run, nums bom current, nums boom, point when kill monster
* array button: pause, stop, restart, boom
*/
var sound = new Audio('sound/bg.mp3');
var over = new Audio('sound/over.mp3');
var heart = 3;
var monster = [];
var speed = 2;
var score = "100";
var timeRun = 20;
var _boom = 3;
var point = parseInt(score);
var size = 80;
var arrButton = [];
var hightScore = 0;
var keyPointPlus = 0;
var _plus; // point plus
var reqAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
/**
* Load game
*/
$(document).ready(function() {
	playGame();
});
function loadGame() {
    //draw window game
    context.drawImage(imgBackground, 0, 0, 500, 700);
    context.drawImage(imgHeart, 10, 40, 20, 20);
    context.drawImage(imgRestart, 400, 10, 30, 30);
    context.font = "20px Georgia";
    context.fillStyle = "white";
    context.fillText("Score: " + point, 10, 30);
    context.fillText("x " + heart, 30, 55);
    start();
}
/**
* Load game and loop
*/
function playGame() {
	if (!_stop) {
		loadGame();
		update();
		over.pause();
	}
}
/** Class monster
* initX: x default
* initY: y default
* fromX: x begin
* fromY: y begin
* x: x current
* y: x current
* toX: move to position x
* toY: move to position y
*/
function Monster(initX, initY, x, y, fromX, fromY, toX, toY, visible) {
	this.initX = initX;
	this.initY = initY;
	this.x = x;
	this.y = y;
	this.fromX = fromX;
	this.fromY = fromY;
	this.toX = toX;
	this.toY = toY;
	this.visible = visible;
}
/*Draw object monster*/
Monster.prototype.draw = function() {
    context.drawImage(imgMonster, this.x, this.y);
}
/*Method move monster*/
Monster.prototype.move = function() {
	if (this.x == this.fromX && this.y == this.fromY) {
		this.x = this.fromX;
		this.y = this.fromY;
		this.fromX = this.initX;
		this.fromY = this.initY;
	}
	if (this.x < this.fromX) {
		this.x += speed;
	} else if (this.x > this.fromX) {
		this.x -= speed;
	}
	if (this.y < this.fromY) {
		this.y += speed;
	} else if (this.y > this.fromY) {
		this.y -= speed;
	}
	//auto kill when dont click
	if (this.x == this.initX && this.y == this.initY) {
		point -= 10;
		killed(this);
		randomMonster();
	if (heart > 0) {
			heart--;
			point += 5;
	}
	else {
			running = false;
		}
	}
};
/*Class button*/
function Button(positionX, positionY, click) {
	this.positionX = positionX;
	this.spositionY = positionY;
	this.click = click;
}
function pointPlus(x, y, _pointPlus, visible) {
	this.x = x;
	this.y = y;
	this._pointPlus = _pointPlus;
	this.visible = visible;
}
/*Update move and draw*/ 
function update() {
	if (!_pause && heart > 0) {
	    context.drawImage(imgBackground, 0, 0, 500, 700);
	    context.drawImage(imgHeart, 10, 40, 20, 20);
	    context.drawImage(imgPause, 450, 10, 30, 30);
	    context.drawImage(imgRestart, 400, 10, 30, 30);
	    context.drawImage(imgBoom, 10, 80, 60, 60);
	    context.fillText("x " + heart, 30, 55);
	    context.fillText("x " + _boom, 50, 135);
	    if (_plus.visible) {
	    		context.drawImage(imgSuprise, _plus.x, _plus.y, 60, 60);
	    }
	    for (var i = 0; i < monster.length; i++) {
	        if (monster[i].visible) {
	            monster[i].move();
	            monster[i].draw();
	        }
	    }
	    context.font = "20px Georgia";
	    context.fillStyle = "white";
	    context.fillText("Score: " + point, 10, 30);
	    if (keyPointPlus == 10) {
	    	_plus.visible = true;
	    	keyPointPlus = 0;
	    }
	} else {
		context.drawImage(imgPlay, 200, 250, 100, 60);
	}
	if (heart <= 0) {
		Stop();
	}
	reqAnimation(update);
}
/*Start game*/
function start() {
	_stop = false;
	_runningGame = true;
	if (heart > 0) {
		sound.play();
	    var ranX = Math.floor(Math.random() * (400 - 2 * 20)) + 20;
	    var ranY = Math.floor(Math.random() * (200 - 2 * 20)) + 20;
	    var monster1 = new Monster(0, 0, 0, 80, 240, 320, 240, 320, false);
		var monster2 = new Monster(200, 0, 200, 0, 240, 240, 240, 240, false);
		var monster3 = new Monster(420, 0, 420, 0, 200, 360, 360, 200, false);
		var monster4 = new Monster(0, 320, 0, 320, 200, 320, 200, 320, false);
		var monster5 = new Monster(420, 320, 420, 320, 200, 300, 300, 300, false);
		var monster6 = new Monster(0, 420, 0, 520, 200, 300, 200, 300, false);
		var monster7 = new Monster(200, 520, 200, 520, 200, 300, 300, 300, false);
		var monster8 = new Monster(420, 420, 420, 420, 200, 300, ranX, ranY, false);
		monster = [monster1, monster2, monster3, monster4, monster5, monster6, monster7, monster8];
		var btnPause = new Button(450, 10, true);
		var btnRestart = new Button(400, 10, true);
		var btnBoom = new Button(10, 80, true);
		_plus = new pointPlus (200, 300, 1, false);
		arrButton = [btnRestart, btnPause, btnBoom];
	    randomMonster();
	} else {
		_stop = true;
		_runningGame = false;
	}
}
/**Kill and point plus
* @mouseX: position mouse x
* @mouseY: position mouse y
* @_monster: position _monster (x, y)
*/
function killMonster(mouseX, mouseY, _monster) {
	// if position mouse in size of monster -> kill monster and random create new monster
    if (mouseX > _monster.x && mouseX <= _monster.x + size && mouseY > _monster.y && mouseY <= _monster.y + size && _monster.visible) {
        	keyPointPlus += 1;
        	killed(_monster);
        	if (point <= 150) {
           		randomMonster();
           		speed = 2;
           	}
        if (point > 150 && point < 250) {
           	randomMonster();
           	speed = 4;
        }
        if (point >= 250) {
           	randomMonster();
           	randomMonster();
           	speed = 4;
        }
    }
}
/*Add envent listener for canvas*/
$(document).ready(function(){
	$("canvas").click(function(e) {
		var mouseX = e.pageX - canvas.offsetLeft;
		var mouseY = e.pageY - canvas.offsetTop;
		if (_runningGame) {
			for (var i = 0; i < 8; i++) {
				killMonster(mouseX, mouseY, monster[i]);
			}
			clickBoom(mouseX, mouseY, arrButton[2]); // click boom
			clickPause(mouseX, mouseY, arrButton[1]); // click pause\
			if (_plus.visible) {
				eatPointPlus(mouseX, mouseY, _plus);
			}
		}
		clickPause(mouseX, mouseY, arrButton[1]);
		if (_stop) {
			newGame(mouseX, mouseY);
			clickRestart(mouseX, mouseY, arrButton[0]) // click restart
		}
		clickRestart(mouseX, mouseY, arrButton[0])
	});
});
/*Create random monster*/
function randomMonster() {
    var x = Math.floor((Math.random() * 7) + 0);
    monster[x].visible = true;
}
/**Check monster had killed?
* @monster: position monster (x, y)
*/
function killed(monster) {
	monster.x = monster.initX;
	monster.y = monster.initY;
	monster.fromX = monster.toX;
	monster.fromY = monster.toY;
	monster.visible = false;
	var tmp = parseInt("10");
    point += tmp;
}
/**clickBoom
* @mouseX: position mouse x
* @mouseY: position mouse y
* @_button: position button (x, y)
*/
function clickBoom(mouseX, mouseY, _button) {
	if (mouseX > _button.positionX && mouseX <= _button.positionX + 40 && mouseY > 100 && mouseY <= 100 + 40) {
		if (_boom > 0) {
			for (var i = 0; i < monster.length; i++) {
				if (monster[i].visible) {
					killed(monster[i]);
				}
			}
			_boom --;
			var sound = new Audio('sound/boom.wav');
			sound.play();
			randomMonster();
		}
	}
}
/**clickPause, clickRestart, clickStop
* @mouseX: position mouse x
* @mouseY: position mouse y
* @_button: position button (x, y)
*/
function clickPause(mouseX, mouseY, _button) {
	//Pause game
	_stop = false;
	if (mouseX >  _button.positionX && mouseX <= _button.positionX + 30 && mouseY > 10 && mouseY <= 10 + 30) {
		_pause = true;
		_runningGame = false;
	}
	//Continuse game
	if (mouseX > 200 && mouseX <=  200 + 100 && mouseY > 250 && mouseY <= 250 + 60) {
		_pause = false;
		_runningGame = true;
	}
}
function clickRestart(mouseX, mouseY, _button) {
	if (mouseX > 400 && mouseX <= 400 + 40 && mouseY > 10 && mouseY <= 10 + 30) {
		timeRun = 20;
		point = 100;
		_boom = 3;
		heart = 3;
		loadGame();
		keyPointPlus = 0;
	}
}
/*Stop game*/
function Stop() {
	sound.pause();
	_stop = true;
	keyPointPlus = 0;
	context.font = "30px Georgia";
   	context.fillStyle = "white";
   	if (hightScore < point) {
   		hightScore = point;
   	}
   	_runningGame = false;
   	if (!_runningGame) {
   		context.drawImage(imgOver, 0, 0, 500, 700);   		
   		context.fillText("Hight Score: " + hightScore, 150, 200);
   		context.fillText("Score: " + point, 150, 250);
   		context.fillStyle = "red";
   		context.font = "20px arial";
   		context.fillText("Play" , 400, 32);
   	}
   	speed = 2;
}
/*Set new game*/
function newGame(mouseX, mouseY) {
	if (mouseX > 200 && mouseX <= 200 + 100 && mouseY > 250 && mouseY <= 250 + 60) {
		_stop = false;
		timeRun = 20;
		point = 100;
		_boom = 3;
		heart = 3;
		loadGame();
		_pause = false;
		_runningGame = true;
	}
}
function eatPointPlus(mouseX, mouseY, _plus) {
	if (mouseX > _plus.x && mouseX <= _plus.x + 60 && mouseY > _plus.y && mouseY <= _plus.y + 60) {
		heart ++;
		_plus.visible = false;
	}
}
