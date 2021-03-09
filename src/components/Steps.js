import React from "react";

export default function Steps(props) {
  let moves = props.history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    const position = move > 0 && (
      <span>
        col: {step.position.column}, row: {step.position.row}
      </span>
    );
    return (
      <li key={move}>
        <button onClick={() => props.jumpTo(move)}>{desc}</button>&nbsp;
        {position}
      </li>
    );
  });

  if (!props.sortAsc) {
    moves = moves.reverse();
  }

  return <ol>{moves}</ol>;
}
