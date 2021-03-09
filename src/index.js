import React from "react";
import ReactDOM from "react-dom";
import { cloneDeep } from "lodash";
// styles
import "./style.css";
// constants
import positions from "./constants/positions";
import initialState from "./constants/initialState";
// helpers
import calculateWinner from "./helpers/calculateWinner";
// components
import Board from "./components/Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = cloneDeep(initialState);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.map(square => ({
      ...square,
      highlighted: false
    }));

    if (this.state.winner || squares[i].value) {
      return;
    }

    const position = positions[i];
    squares[i] = { value: this.state.xIsNext ? "X" : "O", highlighted: true };

    const winner = calculateWinner(squares);
    if (winner) {
      for (const cell of winner.cells) {
        squares[cell].highlighted = true;
      }
    }

    this.setState(state => ({
      history: history.concat([
        {
          squares,
          position
        }
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
      winner: winner ? winner.sign : ""
    }));
  }

  jumpTo(step) {
    this.setState(() => ({
      stepNumber: step,
      xIsNext: step % 2 === 0
    }));
  }

  reset = () => {
    this.setState(() => cloneDeep(initialState));
  };

  changeSort = () => {
    this.setState(state => ({ sortAsc: !state.sortAsc }));
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    let moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      const position = move
        ? `col: ${step.position.column}, row: ${step.position.row}`
        : "";
      const positionDesc = position ? <span>{position}</span> : "";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>&nbsp;
          {positionDesc}
        </li>
      );
    });

    if (!this.state.sortAsc) {
      moves = moves.reverse();
    }

    let status;
    if (this.state.winner) {
      status = "Winner: " + this.state.winner;
    } else if (moves.length === 10) {
      status = "Withdraw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={this.changeSort}>
            Sort {this.state.sortAsc ? "desc" : "asc"}
          </button>
          {moves.length > 1 && <button onClick={this.reset}>Reset</button>}
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
