'use strict'

class Timer {
	constructor () {
		this.content = null;
		this.seconds = 0;
		this.t = null;
		this.add = this.add.bind(this) //bindejar la funcio pel setInterval
	}
	
	start () {
		this.content = document.querySelector('#timer');
		this.t = setInterval(this.add, 1000); //this es Timer, si no es bindeja la funcio add, this es "l'interval"
	}

	add () {
		this.seconds++;
    	this.content.textContent = this.seconds;
	}

	stop () {
		clearInterval(this.t);
	}

	reset () {
		this.content.textContent = "0";
   	 	this.seconds = 0; 
	}
}

// Timer.prototype.start = function () {
// 	this.content = document.querySelector('#timer');
// 	this.t = setInterval(this.add, 1000); //this es Timer, si no es bindeja la funcio add, this es "l'interval"
// }

// Timer.prototype.add = function () {
//     this.seconds++;
//     this.content.textContent = this.seconds;
// }

// Timer.prototype.stop = function () {
// 	clearInterval(this.t);
// }

// Timer.prototype.reset = function () {
//     this.content.textContent = "0";
//     this.seconds = 0; 
// }