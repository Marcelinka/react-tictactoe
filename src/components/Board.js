import React from "react";
// components
import Square from "./Square";

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i].value}
        onClick={() => this.props.onClick(i)}
        isHighlighted={this.props.squares[i].highlighted}
      />
    );
  }

  render() {
    let tableCell = -1;
    const table = new Array(3).fill(undefined).map(() => {
      const tableRow = new Array(3).fill(undefined).map(() => {
        tableCell++;
        return this.renderSquare(tableCell);
      });
      return <div className="board-row">{tableRow}</div>;
    });

    return <div>{table}</div>;
  }
}
