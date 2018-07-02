import React, { Component } from "react";
import "./App.css";
import Hexagram from "./Hexagram";
import { CSSTransition } from "react-transition-group"; // ES6

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayHej: false,
      transition: false
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState(p => ({ displayHej: !p.displayHej, transition: true }));
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <Hexagram
          fuxi={25}
          changing={[true, false, true, false, false, true]}
          interactive
          withControls
        />

        <CSSTransition
          classNames="example"
          timeout={{ exit: 0, enter: 300 }}
          unmountOnExit
          in={this.state.displayHej && !this.state.transition}
          onExited={() => this.setState(p => ({ transition: false }))}
        >
          <h1>Dirp</h1>
        </CSSTransition>

        <CSSTransition
          classNames="example"
          timeout={{ exit: 0, enter: 300 }}
          unmountOnExit
          in={!this.state.displayHej && !this.state.transition}
          onExited={() => this.setState(p => ({ transition: false }))}
        >
          <h1>Durp =)</h1>
        </CSSTransition>

        <button onClick={this.clickHandler}>state</button>
      </div>
    );
  }
}

export default App;
