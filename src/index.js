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
  }

  render() {
    return (
      <div>
        <form className="name-form" onSubmit={e => e.preventDefault()}>
          <input name="first" placeholder="Name of first player" />
          <input name="second" placeholder="Name of second player" />
          <button>Save</button>
        </form>

        <Game />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
