'use strict'

function Cell(x, y) {
	this.x = x
	this.y = y
	this.isBomb = false
	this.cellElement = null;
}

Cell.prototype.drawCell = function() {
	this.cellElement = document.createElement('div')
	if (this.isBomb) {
		this.cellElement.setAttribute('class', 'col bomb cell');
	}else{
		this.cellElement.setAttribute('class', 'col cell')
	}
	
	this.cellElement.setAttribute('id', `${this.x} ${this.y}`)
	return this.cellElement;
}