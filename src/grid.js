'use strict'

function Grid(rows, columns) {
	this.rows = rows || 10
	this.columns = columns || 10
	this.cells = [];
	this.bombCoordinates = [];
}

Grid.prototype.drawGrid = function() {
	const field = document.getElementById('field');	
	for (let i = 0; i < this.rows; i++) {
		const row = document.createElement('div');
		row.setAttribute('class', 'row');
		for (let j = 0; j < this.columns; j++) {
			let newCell = new Cell(i, j);
			if(this.bombCoordinates.includes(`${i},${j}`)){
				newCell.isBomb = true
			}
			this.cells.push(newCell)
			let cell = newCell.drawCell()
			row.appendChild(cell);
		}
		field.appendChild(row);
	}
}

Grid.prototype.assignBombs = function(bombsNumber) {
	let counter = 0;
	while(counter < bombsNumber) {
		let randomRow = Math.floor(Math.random() * this.rows);
		let randomCol = Math.floor(Math.random() * this.columns);
		if(!this.bombCoordinates.includes(`${randomRow},${randomCol}`)){
			this.bombCoordinates.push(`${randomRow},${randomCol}`)
			counter++
		}
	}
	this.drawGrid()
}