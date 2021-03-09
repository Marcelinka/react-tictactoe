import React from "react";
import { cloneDeep } from "lodash";
// constants
import positions from "../constants/positions";
import initialState from "../constants/initialState";
// helpers
import calculateWinner from "../helpers/calculateWinner";
// components
import Board from "./Board";
import Steps from "./Steps";
import Wrapper from "./Wrapper";

export default class Game extends React.Component {
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

  jumpTo = step => {
    this.setState(() => ({
      stepNumber: step,
      xIsNext: step % 2 === 0
    }));
  };

  reset = () => {
    this.setState(() => cloneDeep(initialState));
  };

  changeSort = () => {
    this.setState(state => ({ sortAsc: !state.sortAsc }));
  };

  getNameFromSign(sign) {
    const { firstPlayer, secondPlayer } = this.props;
    if (firstPlayer && sign === "X") {
      return firstPlayer;
    }
    if (secondPlayer && sign === "O") {
      return secondPlayer;
    }
    return sign;
  }

  readStatus() {
    const { winner, stepNumber, xIsNext } = this.state;

    if (winner) {
      return `Winner: ${this.getNameFromSign(winner)}`;
    }

    if (stepNumber === 9) {
      return "Withdraw";
    }

    return `Next player: ${this.getNameFromSign(xIsNext ? "X" : "O")}`;
  }

  render() {
    const { history, stepNumber, sortAsc } = this.state;
    const current = history[stepNumber];

    return (
      <div>
        <Wrapper className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="game-info__status">{this.readStatus()}</div>
            {stepNumber > 0 && <button onClick={this.reset}>Reset</button>}
          </div>
        </Wrapper>
        <div>
          <button className="game-info__sort" onClick={this.changeSort}>
            Sort {sortAsc ? "desc" : "asc"}
          </button>
          <Steps history={history} jumpTo={this.jumpTo} sortAsc={sortAsc} />
        </div>
      </div>
    );
  }
}
