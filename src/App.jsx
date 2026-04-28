import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // Set variables
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turnCount, setTurnCount] = useState(0);
  const [counter, setCounter] = useState(false); // Change to movingPiece, setMovingPiece
  const [selection, setSelection] = useState(null);
  const [message, setMessage] = useState("");
  let status;

  // Validates every click on the board, transitions to chorus lapilli after six turns
  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }

    if (turnCount < 6) {
      if (squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setTurnCount((prev) => prev + 1);
    } else {
      if (counter) {
        moveSquare(i);
      } else {
        select(i);
      }
    }
  }

  // Player selects square containing their piece type to move
  function select(i) {
    if (xIsNext && squares[i] === "X") {
      setMessage("Selected an X");
      setSelection(i);
      setCounter(true);
    } else if (!xIsNext && squares[i] === "O") {
      setMessage("Selected an O");
      setSelection(i);
      setCounter(true);
    }
  }

  // Moves the selected piece to an indicated adjacent blank square, error if occupied or non-adjacent
  function moveSquare(i) {
    if (squares[i] || !adjacentCheck(selection).includes(i)) {
      setMessage("Error: Select another spot");
      setCounter(false);
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = squares[selection];
    nextSquares[selection] = null;

    // Player attempts to move a piece not in the center, c
    if (selection !== 4 && centerCheck()) {
      const isWinningMove = calculateWinner(nextSquares);
      if (isWinningMove) {
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
        setMessage("");
      }
    } else {
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setMessage("");
    }
    setCounter(false);
  }

  // If there is a piece in the center, force player to move that piece unless they can win
  function centerCheck() {
    if (xIsNext && squares[4] === "X") {
      setMessage(
        "Error: Not a winning move. Please move the center piece out."
      );
      return true;
    }

    if (!xIsNext && squares[4] === "O") {
      setMessage(
        "Error: Not a winning move. Please move the center piece out."
      );
      return true;
    }
    return false;
  }

  // Check for adjacent spots that a piece can be moved to once selected
  function adjacentCheck(i) {
    if (i === 0) {
      return [1, 3, 4];
    }

    if (i === 1) {
      return [0, 2, 3, 4, 5];
    }

    if (i === 2) {
      return [1, 4, 5];
    }

    if (i === 3) {
      return [0, 1, 4, 6, 7];
    }

    if (i === 4) {
      return [0, 1, 2, 3, 5, 6, 7, 8];
    }

    if (i === 5) {
      return [1, 2, 4, 7, 8];
    }

    if (i === 6) {
      return [3, 4, 7];
    }

    if (i === 7) {
      return [3, 4, 5, 6, 8];
    }

    if (i === 8) {
      return [4, 5, 7];
    }
  }

  // Show if there is a winner or whose turn is next based on state of the board
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // Display the winner if there are three in a row, then disable any further movements
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{message}</div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
