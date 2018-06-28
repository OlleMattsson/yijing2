import React, { Component } from "react";
import "./App.css";
import Hexagram from "./Hexagram";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hexagram withControls />
        <Hexagram fuxi={7} />
        <Hexagram
          fuxi={25}
          changing={[true, false, false, false, false, false]}
          interactive
        />
      </div>
    );
  }
}

export default App;
