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

  changeFirstPlayer = e => {
    this.tempFirstPlayer = e.target.value;
  };

  changeSecondPlayer = e => {
    this.tempSecondPlayer = e.target.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(() => ({
      firstPlayer: this.tempFirstPlayer,
      secondPlayer: this.tempSecondPlayer
    }));
  }

  render() {
    const players = this.state.firstPlayer && this.state.secondPlayer && (
      <div>
        <p>
          Player <b>X</b>: {this.state.firstPlayer}
        </p>
        <p>
          Player <b>O</b>: {this.state.secondPlayer}
        </p>
      </div>
    );

    return (
      <div>
        <form className="name-form" onSubmit={this.handleSubmit}>
          <input
            name="first"
            placeholder="Name of first player"
            onChange={this.changeFirstPlayer}
          />
          <input
            name="second"
            placeholder="Name of second player"
            onChange={this.changeSecondPlayer}
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
