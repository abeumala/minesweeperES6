'use strict'

function main () {
	const mainElement = document.querySelector('#main');
	let localStorage = new LocalStorage();

	function buildDom(htmlElement) {
		mainElement.innerHTML = htmlElement
		return mainElement;
	}

	function buildWelcomeScreen() {
		const screen = buildDom(` 
			<section id="welcome">
				<div id="font-page-title">
					<div id="image-container">
						<img id="mine-img" alt="welcome"  src="./img/redbomb.png">
					</div>
					<h1 id="splash-title"> MINESWEEPER </h1>
					<div id="image-container">
						<img id="mine-img" alt="welcome"  src="./img/redbomb.png">
					</div>
				</div> 
				<form>
					<div class="group">    
				      <input type="text" required id="text-input">
				      <span class="highlight"></span>
				      <span class="bar"></span>
				      <label>Username</label>
						</div>
					<input type="submit" class="md-btn md-btn-raised">
				</form>
			</section>
		`);

		const startButton = document.querySelector('.md-btn');
		startButton.addEventListener('click', startGame);  // as an event listener parameter do not put ()
	}

	function buildGameScreen() {
		const screen = buildDom(`
			<div id="header">
	    		<span id="timer" class="info-window">0</span>
		    	<img id="happy-face" src="./img/happyface.jpg"/>
		    	<span id="bombs-counter" class="info-window"></span>
	    	</div>	
	    	<div id="field"></div>
		`);
	}

	function buildGameOverScreen() {
		const screen = buildDom(`
			<section id="welcome">
				<h1>GAME OVER</h1>
				<table id="rankingTable">
					<tbody>
						<tr><td>Position</td><td>Username</td><td>Seconds</td></tr>
					</tbody>
				</table>
				<button type="button" class="restart-btn">Click Me!</button>
			</section>
		`);

		const restartButton = document.querySelector('.restart-btn');
		restartButton.addEventListener('click', buildWelcomeScreen); 

		let users = localStorage.getUsers();
		users.sort(function(a, b) {
		  return a.ranking - b.ranking;
		});
		let tableRef = document.querySelector('#rankingTable').getElementsByTagName('tbody')[0]
		if (users.length > 0) {
			users.map((user, index) => {
				var newRow = tableRef.insertRow(tableRef.rows.length);
				var positionCell  = newRow.insertCell(0);
				var positionText  = document.createTextNode(index + 1);
				positionCell.appendChild(positionText);
				var usernameCell  = newRow.insertCell(1);
				var usernameText  = document.createTextNode(user.username);
				usernameCell.appendChild(usernameText);
				var rankingCell  = newRow.insertCell(2);
				var rankingText  = document.createTextNode(user.ranking);
				rankingCell.appendChild(rankingText);
			})
		}
		
	}

	function checkBomb(cell) {
		if (cell && cell.classList.contains('bomb')) {
			return 1
		} 
		return 0	
	}

	function startGame() {
		let username = document.querySelector('#text-input').value
		if (username.length < 3) return
		let user = localStorage.getUser(username) // if && else inliners
		if (!user) { //checking if there is a user with that username alraedy, if there is not, create new user
			user = new User(username)
		}

		buildGameScreen();
		let game = new Game()
		game.start(13,17);

		for (var i = 0; i < game.grid.cells.length; i++) {
			game.grid.cells[i].cellElement.addEventListener('contextmenu', function(event) {  //contextmenu captures right click
				if (!game.counting) { //counting is a global variable for the timer to reset
					game.startTimer();	
					game.counting = true;
				}

			  let myCell = this; 
				event.preventDefault();
			    if (myCell.children[0] && myCell.children[0].children[0].nodeName === 'IMG') { //putting flags and taking them out
					myCell.innerHTML = "";  
			    	game.bombsLeft++

			    } else {
					myCell.innerHTML = "<span id='flag-container'><img class='flag-img' src='./img/flag.png'/></span>"
					game.bombsLeft--
			    }

				if (checkGameFinished(game)) {
					let myRanking = user.ranking
					if (myRanking === 0) {
						user.ranking = game.timer.seconds;
						localStorage.saveUser(user)
					}
					if (myRanking > game.timer.seconds) {
						user.ranking = game.timer.seconds;
						localStorage.saveUser(user)
					}
		    		game.gameOver();
		    		buildGameOverScreen();
				}
			    
				game.setScore(game.bombsLeft)
			    return false;
			}, false);


			game.grid.cells[i].cellElement.addEventListener('click', function () {  //left click event listener
				const myCell = this; //this equals each cell here
				if (!game.counting) {
				game.startTimer();	
				game.counting = true;
				}

				if(myCell.classList.contains("bomb")) {
					game.gameOver();
					buildGameOverScreen();
				} else {
					let nearBombCount = 0;
					let id = myCell.id.split(" ");
					let y = parseInt(id[0]);
					let x = parseInt(id[1]);
					floodFill();
					function floodFill () {
						for (var i = y - 1; i <= y + 1 ; i++) { // :D
							for (let j = x - 1; j <= x + 1; j++) {
								let cellAround = document.getElementById(i + " " + j)
								if (cellAround) {
									nearBombCount += checkBomb(cellAround);	
								}
							}
						// }
						// if (nearBombCount === 0 && game.grid.cells[i].isBomb === false) {
						// 	for (var i = y - 1; i <= y + 1 ; i++) {
						// 		for (let j = x - 1; j <= x + 1; j++) {
						// 			myCell.innerHTML = "<span class='bombs-near'></span>"
						// 		}

						// 	}	
						// 	return floodFill();		
						// } else {
							myCell.innerHTML = "<span class='bombs-near'>"+nearBombCount+"</span>";
						}
					}
				}
				if (checkGameFinished(game)) {
					let myRanking = user.ranking
					if (myRanking === 0) {
						user.ranking = game.timer.seconds;
						localStorage.saveUser(user)
					}
					if (myRanking > game.timer.seconds) {
						user.ranking = game.timer.seconds;
						localStorage.saveUser(user)
					} else {
		    		game.gameOver();
		    		buildGameOverScreen();
					}
                }
            });    
        }
        document.getElementById('happy-face').addEventListener('click', function() {
            if (game.isOver) {
                startGame();
            }
        });
	}
	
	function checkGameFinished(game) {
		let cells = game.grid.cells.map(item => {let type = Object.assign({}, item); return type});
		let cellCount = 0;

		cells.map((cell, index) => {
			game.grid.bombCoordinates.map((bomb) => {
				if (cell.x == bomb.split(",")[0] && cell.y == bomb.split(",")[1]) {
					cells.splice(index, 1)
				}
			})
		})

		cells.map((cell) => {
			if (cell.cellElement.children.length > 0) {
				if (cell.cellElement.children[0].childNodes[0].nodeName != 'IMG') { //posem [0] perque es el primer i unic element a children/childNodes
					cellCount++	
				}
				
			}
		})

		if (cellCount == cells.length) {
			return true;
		}

		return false;

	}

	buildWelcomeScreen();

}

window.addEventListener('load', main); //window its more generic than document