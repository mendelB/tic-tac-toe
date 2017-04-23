class Board {
	constructor() {
		this.setNewBoard();
	}

	reset() {
		this.setNewBoard()
	}

	get cells() {
    return this._cells;
  }

  set cells(cells){
    this._cells = cells;
  }

  setNewBoard() {
		this.cells = Array(9).fill(null)
  }

  isFull() {
  	return this.cells.filter((cell, index) => !this.isTaken(index)).length < 1
  }

  turnCount() {
  	return this.cells.reduce((count, cell) => {
  		return cell ? count+1 : count
  	}, 0)
  }

  isTaken(pos) {
		return this.cells[pos] !== null
  }

  isValidMove(pos) {
  	return pos < 9 && pos >= 0 && !this.isTaken(pos)
  }

  update(pos, player) {
  	return this.cells[Number(pos)] = player.token
  }

}

export default Board;