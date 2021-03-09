import React from "react";
import ReactDOM from "react-dom";
// components
import Game from "./components/Game";
// styles
import "./style.less";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPlayer: "",
      secondPlayer: ""
    };

    this.tempFirstPlayer = "";
    this.tempSecondPlayer = "";
  }

  changePlayerName = e => {
    const { target } = e;
    const { name, value } = target;
    this[name] = value;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(() => ({
      firstPlayer: this.tempFirstPlayer,
      secondPlayer: this.tempSecondPlayer
    }));
  };

  render() {
    const { firstPlayer, secondPlayer } = this.state;
    const players = firstPlayer && secondPlayer && (
      <div className="players">
        <p>
          Player <b>X</b>: {firstPlayer}
        </p>
        <p>
          Player <b>O</b>: {secondPlayer}
        </p>
      </div>
    );

    return (
      <div>
        <form className="name-form" onSubmit={this.handleSubmit}>
          <input
            name="tempFirstPlayer"
            placeholder="Name of first player"
            onChange={this.changePlayerName}
          />
          <input
            name="tempSecondPlayer"
            placeholder="Name of second player"
            onChange={this.changePlayerName}
          />
          <button type="submit">Save</button>
        </form>

        {players}

        <Game />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
