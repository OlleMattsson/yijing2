import React, { Component } from "react";
import "./App.css";
import Hexagram from "./components/Hexagram";
import {
  fuxiToBinary,
  binaryToKingWen,
  binaryToFuxi,
  makeLineWithFourCoins,
  makeFutureHexagram,
  convertToBinarySequence,
  getChanges
} from "./lib/iching-helpers";

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayHej: false,
      transition: false,
      randomNumbers: [],
      nowSequence: [],
      nowSequenceBinary: [],
      nowSequenceFuxi: 0,
      futureSequence: [],
      futureSequenceBinary: [],
      futureSequenceFuxi: 0,
      changes: []
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState(p => ({ displayHej: !p.displayHej, transition: true }));
  }

  fetchRandomNumbers = async howmany => {
    return await (await fetch(
      "https://qrng.anu.edu.au/API/jsonI.php?length=" + howmany + "&type=uint8"
    )).json();
  };

  async componentDidMount() {
    try {
      this.fetchRandomNumbers(24).then(res => {
        const randomNumbers = res.data;
        let nowSequence = [];
        let futureSequence = [];
        let nowSequenceBinary = [];
        let futureSequenceBinary = [];
        let changes = [];

        for (var i = 0; i < 6; i++) {
          var arr = randomNumbers.slice(i * 4, i * 4 + 4); // pick next 4 numbers from our set of 24
          nowSequence[i] = makeLineWithFourCoins(arr);
        }

        futureSequence = makeFutureHexagram(nowSequence);

        nowSequenceBinary = convertToBinarySequence(nowSequence);
        futureSequenceBinary = convertToBinarySequence(futureSequence);

        changes = getChanges(nowSequenceBinary, futureSequenceBinary);

        this.setState({
          nowSequence,
          futureSequence,
          nowSequenceBinary,
          nowSequenceFuxi: parseInt(nowSequenceBinary.join(""), 2),
          futureSequenceBinary,
          futureSequenceFuxi: parseInt(futureSequenceBinary.join(""), 2),
          changes
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate() {
    //console.log("appDidUpdate:", this.state.changes);
  }

  render() {
    return (
      <div className="App">
        <div
          className="changingHexagramContainer"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Hexagram
            style={{ flex: 1, margin: "10px" }}
            fuxi={this.state.nowSequenceFuxi}
            changing={this.state.changes}
          />

          <Hexagram
            style={{ flex: 1, margin: "10px" }}
            fuxi={this.state.futureSequenceFuxi}
            changing={[false, false, false, false, false, false]}
          />
        </div>

        {/*


      
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
        */}
      </div>
    );
  }
}

export default App;
