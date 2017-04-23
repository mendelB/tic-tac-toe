class Board {
	constructor() {
		this.setNewBoard();
	}

	reset() {
		this.setNewBoard()
	}

	get cells() {
    return this._name.toUpperCase();
  }

  set cells(cells){
    this._cells = cells;
  }

  setNewBoard() {
		this.cells = Array(9).fill(null)
  }

  isFull() {
  	return this.cells.filter((cell) => !this.isTaken(cell)).length < 1
  }

  turnCount() {
  	this.cells.reduce((count, cell) => {
  		return cell ? count+1 : count
  	}, 0)
  }

  isTaken(pos) {
		return this.cells[pos]
  }

  isValidMove(pos) {
  	return pos < 9 && pos > 0 && !this.isTaken(pos)
  }

  update(pos, player) {
  	return this.cells[pos] = player.token
  }

}

export default Board;