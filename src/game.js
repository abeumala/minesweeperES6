'use strict'


function Game() {
	this.grid = null
	this.bombsNumber = 0
	this.bombsLeft = 0
	this.counting = false
	this.isOver = false
	this.timer = new Timer();
}

Game.prototype.start = function(rows, cols) {
	if (this.timer.content) this.clearTimer();
	this.counting = false;
	const field = document.getElementById('field');
	while (field.firstChild) {
    	field.removeChild(field.firstChild);
    }
	document.getElementById('happy-face').src  = './img/happyface.jpg';
	this.grid = new Grid(rows || 10, cols || 20)
	this.getBombs()
}

Game.prototype.getBombs = function() {
	this.bombsNumber = Math.floor((this.grid.columns * this.grid.rows) * 0.2);
	this.bombsLeft = this.bombsNumber
	this.setScore(this.bombsLeft)
	this.grid.assignBombs(this.bombsNumber)
}

Game.prototype.setScore = function(bombsLeft) {
	let bombsCountdown = document.getElementById('bombs-counter');
	bombsCountdown.innerHTML = bombsLeft;
}

Game.prototype.startTimer = function() {
	this.timer.start()
}

Game.prototype.stopTimer = function() {
	this.timer.stop();
}

Game.prototype.clearTimer = function() {
	this.timer.reset();
}

Game.prototype.gameOver = function() {
	this.stopTimer()
	this.isOver = true
	document.getElementById('happy-face').src  = './img/sadface.png';
	let displayBombs = document.querySelectorAll('.bomb');

	displayBombs.forEach(function(element) {
		element.innerHTML = "<span id='bomb-container'><img class='flag-img' src='./img/bomb.png'/></span>"
	});

	displayBombs.forEach(function(element) {
		element.innerHTML = "<img class='flag-img' src='./img/bomb.png'/>"
	});
 }
