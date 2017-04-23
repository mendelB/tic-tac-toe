import React from 'react';
import Board from './Board';
import Game from '../TTTLogicUtility/Game'

class GameComponent extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			game: new Game(),
      ai: false
		}
	}
	handleClick(i) {
		if (this.state.game.isOver()) return
		this.state.game.playTurn(i)
		if (this.state.ai) {
			this.state.game.computerMove()
		}
		this.setState(this.state);
	}
	setAi() {
		this.setState({
			ai: !this.state.ai,
			game: new Game()
		})
	}
	newGame() {
		this.setState({game: new Game()})
	}
  render() {
  	const gameSquares = this.state.game.board.cells
		const winner = this.state.game.winner();

		let status;
		if (winner) {
		  status = 'Winner: ' + winner;
		} else if (this.state.game.isOver()) {
			status = 'Draw'
		} else {
		  status = 'Next player: ' + (this.state.game.currentPlayer().token);
		}

  
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          	squares={gameSquares} 
          	onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
        	<button onClick={() => this.newGame()}>New Game</button>
        	<button onClick={() => this.setAi()}>{this.state.ai ? 'Play a Human' : 'Play the Computer'}</button>
          <div>{ this.state.ai ? 'Playing Computer' : 'Playing Human'}</div>
          <div>{ status }</div>
        </div>
      </div>
    );
  }
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], combo: [a,b,c] };
    }
  }
  return null;
}


export default GameComponent;