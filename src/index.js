import React from "react";
import { render } from "react-dom";
import Board, { calculateWinner } from "./Board";
import "./index.css";

class Game extends React.Component {
  //populate state with a react elements coreseontidnt to history

  constructor(props) {
    super(props);
    this.state = {
      player: ["X", "O"],
      history: [{ move: Array(9).fill(null) }],
      stepNumber: 0,
    };
  }

  async handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    const currentMove = current.move.slice();
    const oldPlayer = this.state.player.slice();

    if (calculateWinner(currentMove) || currentMove[i]) return;

    const oldHistory = history.slice();
    // @dev add these asignments together after test
    currentMove[i] = this.state.player[0];
    const newHistory = oldHistory.concat([{ move: currentMove }]);
    //swap players
    const newPlayer = ([oldPlayer[0], oldPlayer[1]] = [
      oldPlayer[1],
      oldPlayer[0],
    ]);
    console.log(oldHistory, newPlayer);

    Promise.resolve(
      this.setState({
        player: newPlayer,
        history: newHistory,
        stepNumber: history.length,
      })
    ).then(() => console.log(this.state.history));
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      player: step % 2 === 0 ? ["X", "O"] : ["O", "X"],
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.move);
    //rendering a mapped over history, rather than updating state and then rendering
    const playerMoves = history.map((step, playerMove) => {
      const desc =
        playerMove > 0 ? `Go to move # ${playerMove}` : `Go to game start`;
      return (
        <li key={`playerMove${playerMove}`}>
          <button onClick={() => this.jumpTo(playerMove)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}!`;
    } else status = `Next player: ${this.state.player[0]}`;
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.move} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{playerMoves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

render(<Game />, document.getElementById("root"));
