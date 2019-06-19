import React, { Component } from "react";
import "./App.css";
import {Hexagram} from "./components/Hexagram";
import {
  makeLineWithFourCoins,
  makeFutureHexagram,
  convertToBinarySequence,
  getChanges
} from "./lib/iching-helpers";
import { CSSTransition } from "react-transition-group";
import Spinner from "./components/spinner/spinner";
import mockedResponse from "./static/mockedQRNGResponse"

class App extends Component {
  constructor() {
    super();
    this.state = {
      transition: false,
      randomNumbers: [],
      nowSequence: [],
      nowSequenceBinary: [],
      nowSequenceFuxi: 0,
      futureSequence: [],
      futureSequenceBinary: [],
      futureSequenceFuxi: 0,
      changes: [],
      displayHexagrams: false
    };
  }

  fetchRandomNumbers = async howmany => {
    return mockedResponse;
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
          changes,
          displayHexagrams: true
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="changingHexagramContainer" >
          {!this.state.displayHexagrams && <Spinner />}
          <CSSTransition
            classNames="hexagramTransitionContainer"
            timeout={{ exit: 1000, enter: 500 }}
            unmountOnExit
            in={this.state.displayHexagrams}
            onExited={() => this.setState(p => ({ transition: false }))}
          >
            <div style={{ display: "flex" }}>
              <Hexagram
                fuxi={this.state.nowSequenceFuxi}
                changing={this.state.changes}
              />
              <Hexagram
                fuxi={this.state.futureSequenceFuxi}
                interactive
                withControls
              />
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  }
}

export default App;
