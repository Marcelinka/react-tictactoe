import React from 'react';
import PropTypes from 'prop-types';
// components
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i].value}
        onClick={() => this.props.onClick(i)}
        isHighlighted={this.props.squares[i].highlighted}
      />
    );
  }

  render() {
    let tableCell = -1;
    const table = new Array(3).fill(undefined).map((el, i) => {
      const tableRow = new Array(3).fill(undefined).map(() => {
        tableCell += 1;
        return this.renderSquare(tableCell);
      });
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div className="board-row" key={i}>
          {tableRow}
        </div>
      );
    });

    return <div>{table}</div>;
  }
}

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, highlighted: PropTypes.bool }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Board;
