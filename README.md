# Minesweeper-OOP

## main.js
  #### function main() {
    buildWelcomeScreen() --> startBUtton event listener onClick startGame()
    startGame() {
      buildGameScreen()
      let game = new Game();
      game.start(rows, cols);
      if(checkGameFinished(game) buildGameOverScreen();
      if(game.isOver) startGame();
    }
    checkGameFinished()
    buildWelcomeScreen();
  }

## game.js
  ### function Game() {
    this.grid
    this.bombsNumber
    this.bombsLeft
    this.counting
    this.isOver
    this.timer = new Timer ()
    
    this.start()
    this.getBombs()
    this.setScore()
    this.startTimer()
    this.stopTimer()
    this.clearTimer()
    this.gameOver()
  }
  
## grid.js
  ### function Grid(rows,cols) {
    this.rows
    this.cols
    this.cells = [];
    this.bombCoordinates = [];
    
    this.drawGrid();
    this.assignBombs();
  }

## cell.js
  ### function Cell(x,y) {
    this.x
    this.y
    this.isBomb
    this.cellElement
    
    this.drawCell()
  }
  
## timer.js
  ### function Timer () {
    this.content
    this.seconds
    this.t (to clear interval)
    
    this.start()
    this.add()
    this.stop()
    this.reset()
  }

## user.js
  ### function User(username) {
    this.username
    this.ranking
  }

## localStorage.js
  ### function localStorage () {
    this.db (databse)
    
    this.getUsers()
    this.saveUsers()
    this.getUser()
    this.clear()
  }

  ### DEMO
  https://abeumala.github.io/Minesweeper-OOP/

