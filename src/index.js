import React from "react";
import { render } from "react-dom";
import Board, { calculateWinner } from "./Board";
import "./index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: ["X", "O"],
      history: [
        {
          move: Array(9).fill(null),
        },
      ],
    };
  }

  async handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];

    const currentMove = current.move.slice();
    const oldPlayer = this.state.player.slice();

    if (calculateWinner(currentMove) || currentMove[i]) return;

    const oldHistory = this.state.history.slice();
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
      })
    ).then((value) => console.log(this.state.history));
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.move);

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
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

render(<Game />, document.getElementById("root"));
