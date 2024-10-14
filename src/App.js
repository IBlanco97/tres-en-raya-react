import { useState } from "react";
import { CSSTransition } from 'react-transition-group'

function Square({ value, onSquareClick, extraClass }) {
  const className = "square btn btn-primary m-2 " + extraClass;
  return (
    <button className={className} onClick={onSquareClick}>
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
      <div className="status">
        {status}
      </div>
      <br></br>
      <div className="board">
        <div className="board-row d-flex flex-wrap justify-content-center mt-4">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} extraClass="right" />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} extraClass="left"/>
        </div>
        <div className="board-row d-flex flex-wrap justify-content-center mt-4 center">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} extraClass="right"/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} extraClass="left"/>
        </div>
        <div className="board-row d-flex flex-wrap justify-content-center mt-4">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} extraClass="right"/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} extraClass="left"/>
        </div>
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
    setPX(index % 2 === 0);
  }

  return (
    <div className="game">
      <div className="container main-container">
            <div className="gamne-board">
              <Board pX={pX} squares={squares} onPlay={handlePlay} />
            </div>
            <br></br>
            <div className="game-info">
                {timeline.slice(0, timeline.length - 1).map((elemento, index) => (
                    <button className="preview-button" key={index} onClick={() => handleBackInTime(index)}>
                      Back to<br></br>move {index}
                    </button>
                  
                ))}
              
            </div>
          
      </div>
    </div>
  );
}
