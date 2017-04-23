import Board from './Board'

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

	constructor(board, playerOne, playerTwo) {
		this.board = board || new Board();
		this.playerOne = playerOne || new Player("X");
		this.playerTwo = playerTwo || new Player("O");
	}

	currentPlayer() {
		return this.board.turnCount % 2 === 0 ? this.playerOne : this.playerTwo;
	}

	isWinner() {
		WIN_COMBINATIONS.forEach((comb) => {
			if (this.board.isTaken(comb[0]) &&
				comb.filter((pos) => this.board.cells[pos] == this.board.cells[comb[0]]).length === 3) {
					return comb;
			}	
		})
	}

	isDraw() {
		return this.board.isFull && !this.isWinner();
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

}

export default Game;