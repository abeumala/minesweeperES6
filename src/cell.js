'use strict'

class Cell {
	constructor (x, y) {
		this.x = x;
		this.y = y;
		this.isBomb = false;
		this.cellElement = null;
	}

	drawCell () {
		this.cellElement = document.createElement('div')
		if (this.isBomb) {
		this.cellElement.setAttribute('class', 'col bomb cell');
		}else{
		this.cellElement.setAttribute('class', 'col cell')
		}
		console.log(this.x, this.y)
		this.cellElement.setAttribute('id', `${this.x} ${this.y}`)
		return this.cellElement;
	}
}

// Cell.prototype.drawCell = function() {
// 	this.cellElement = document.createElement('div')
// 	if (this.isBomb) {
// 		this.cellElement.setAttribute('class', 'col bomb cell');
// 	}else{
// 		this.cellElement.setAttribute('class', 'col cell')
// 	}
	
// 	this.cellElement.setAttribute('id', `${this.x} ${this.y}`)
// 	return this.cellElement;
// }