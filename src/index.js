import { render } from "react-dom";
import { useState } from "react";
import Board from "./Board";
import calculateWinner from "./calculateWinner";
import "./index.css";
import SHA256 from "sha256-es";
//import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
//import { FixedSizeList } from "react-window";

const Game = () => {
  const [player, setPlayer] = useState("X");
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [move, setMove] = useState(0);

  const current = history[move];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) status = `Winner ${winner}!`;
  else status = `Next Player: ${player}`;

  const handleClick = (i) => {
    const historyTwo = history.slice(0, move + 1);
    console.log(historyTwo);
    const newSquares = historyTwo[historyTwo.length - 1].squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) return;

    newSquares.splice(i, 1, player);
    const nextPlayer = player === "X" ? "O" : "X";
    const newHistory = history.concat([{ squares: newSquares }]);
    setPlayer(nextPlayer);
    setHistory(newHistory);
    setMove(history.length);
  };
  const jumpTo = (move) => {
    //jump to index in ar of moves
    //change player to reflect index
    //even index = W player
    setMove(move);
    move % 2 === 0 ? setPlayer("X") : setPlayer("O");
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Jump To Move ${move}` : `Go To Game Start`;
    const keyHash = SHA256.hash(`move${move}`).toString();
    return (
      <ListItem key={keyHash} component="div" disablePadding>
        <ListItemButton onClick={() => jumpTo(move)}>
          <ListItemText primary={desc}></ListItemText>
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>

        <ol>{moves}</ol>
      </div>
    </div>
  );
};
// ========================================

render(<Game />, document.getElementById("root"));
