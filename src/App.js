import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ pX, squares, onPlay }) {
  let status;

  function handleClick(id) {
    const nextSquares = squares.slice();
    const winner = calculateWinner(nextSquares);
    if (nextSquares[id] === null && winner === null) {
      nextSquares[id] = pX ? "X" : "O";
      onPlay(nextSquares);
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

  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (pX ? "X" : "O");
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

export default function Game() {
  //pX: playingX defined true whie is X's turn, false when is O's turn
  const [pX, setPX] = useState(true);
  //udPX: change the turn to next player
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [timeline, setTimeline] = useState([squares]);

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
    setPX(!pX);
    const nextTimeline = timeline.slice();
    nextTimeline.push(nextSquares);
    setTimeline(nextTimeline);
  }

  function handleBackInTime(index) {
    const nextTimeline = timeline.slice(0, index + 1);
    setTimeline(nextTimeline);
    setSquares(nextTimeline.at(-1));
  }

  return (
    <div className="game">
      <div className="gamne-board">
        <Board pX={pX} squares={squares} onPlay={handlePlay} />
      </div>
      <div classname="game-info">
        <ul>
          {timeline.slice(0, timeline.length - 1).map((elemento, index) => (
            <li>
              <button key={index} onClick={() => handleBackInTime(index)}>
                Back to<br></br>move {index}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
