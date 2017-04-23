import Board from './Board'
import Player from './Player'

const WIN_COMBINATIONS = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
]

class Game {

	constructor(ai) {
		this.board = new Board();
		this.playerOne = new Player("X");
		this.playerTwo = new Player("O");
	}

	currentPlayer() {
		return this.board.turnCount() % 2 === 0 ? this.playerOne : this.playerTwo;
	}

	isWinner() {
		const cells = this.board.cells;
		let winner;
		WIN_COMBINATIONS.forEach((comb) => {
			if (cells[comb[0]] && cells[comb[1]] === cells[comb[2]] && cells[comb[0]] === cells[comb[1]]) {
				winner = comb;
			}	
		})
		return winner
	}

	isDraw() {
		return this.board.isFull() && !this.isWinner();
	}

	isOver() {
		return this.isDraw() || this.isWinner()
	}

	winner() {
		let pos = this.isWinner()
		if (pos) return this.board.cells[pos[0]]
	}

	playTurn(pos) {
		if (!this.board.isValidMove(pos)) return false
		this.board.update(pos, this.currentPlayer())
		return this.board.cells
	}

	availableMoves() {
		let arr = []
		for (var i = 0; i < this.board.cells.length; i++) {
			if (!this.board.isTaken(i)) arr.push(i)
		}
		return arr
	}

	computerMove() {
			if (this.currentPlayer().token !== "O") return;
			let move = null;
			let i;
			for (i = 0; i < WIN_COMBINATIONS.length && move === null; i++) {
				let comb = WIN_COMBINATIONS[i]
				debugger
				if (comb.filter((pos) => this.board.cells[pos] === "O").length === 2 && comb.filter((pos) => !this.board.isTaken(pos)).length > 0 ) {
					move = comb.find( (pos) => !this.board.isTaken(pos) )
				}
			}
			for (i = 0; i < WIN_COMBINATIONS.length && move === null; i++) {
				let comb = WIN_COMBINATIONS[i]
				if (comb.filter( (pos) => this.board.isTaken(pos) && this.board.cells[pos] !== "O" ).length === 2 && comb.find((pos) => !this.board.isTaken(pos))) {
          move = comb.find( (pos) => !this.board.isTaken(pos) )
        }
			}
      if (move === null) {
      	debugger
      	move = [1, 3, 7, 9, 2, 4, 6, 8].find( pos => !this.board.isTaken(pos) )
      }
			this.playTurn(move)
	}

}

export default Game;