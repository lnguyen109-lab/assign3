import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board({ xIsNext, squares, onPlay }) {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [prevSpot, setPrevSpot] = useState(-1);
  const [spotChosen, setSpotChosen] = useState(false);
  const [winningMove, setWinningMove] = useState(false);
  
  //const xIsNext = currentMove % 2 === 0;
  //const currentSquares = squares[currentMove];

  
  
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  // Show if there is a winner or whose turn is next based on state of the board
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
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

// (PLEASE CHANGE, NO LONGER DEFAULT FUNCTION)
function Game() {

  function handlePlay(nextSquares) {
    const nextSquare = [...square.slice(0, currentMove + 1), nextSquares];
    setSquares(nextSquare);
    setCurrentMove(nextSquare.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = squares.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Checks if there is currently a piece in the center
  function centerCheck() {
      if (xIsNext && squares[4] === 'X') {
          return true;
      } 
        
      if (!xIsNext && squares[4] === 'O') {
          return true;
      }
      return false;
  }


// Checks board if winning combinations are present
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
      return squares[a];
    }
  }
  return null;
}

// Ensures movement of a piece happens in an adjacent square only
function adjacentCheck(i, j) {
  if (i === 0)
    return j === 1 || j === 3 || j === 4;
  else if (i === 1)
    return j === 0 || j === 2 || j === 4 || j === 3 || j === 5;
  else if (i === 2)
    return j === 1 || j === 4 || j === 5;
  else if (i === 3)
    return j === 0 || j === 1 || j === 4 || j === 6 || j === 7;
  else if (i === 4) 
    return true;
  else if (i === 5)
    return j === 1 || j === 2 || j === 4 || j === 7 || j === 8;
  else if (i === 6)
    return j === 3 || j === 4 || j === 7;
  else if (i === 7)
    return j === 3 || j === 4 || j === 5 || j === 6 || j === 8;
  else if (i === 8)
    return j === 4 || j === 5 || j === 7;
}
