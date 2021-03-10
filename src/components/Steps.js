import React from 'react';
import PropTypes from 'prop-types';

function Steps(props) {
  let moves = props.history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    const position = move > 0 && (
      <span>
        col: {step.position.column}, row: {step.position.row}
      </span>
    );
    return (
      // eslint-disable-next-line react/no-array-index-key
      <li key={move}>
        <button type="button" onClick={() => props.jumpTo(move)}>
          {desc}
        </button>
        &nbsp;
        {position}
      </li>
    );
  });

  if (!props.sortAsc) {
    moves = moves.reverse();
  }

  return <ol>{moves}</ol>;
}

Steps.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        column: PropTypes.number,
        row: PropTypes.number,
      }),
    }),
  ).isRequired,
  jumpTo: PropTypes.func.isRequired,
  sortAsc: PropTypes.bool,
};

export default Steps;
