import React, { Component } from "react";
import "./App.css";
import {Hexagram} from "./components/Hexagram";
import {
  makeLineWithFourCoins,
  makeFutureHexagram,
  convertToBinarySequence,
  getChanges,
  binaryToFuxi
} from "./lib/iching-helpers";
import { CSSTransition } from "react-transition-group";
import Spinner from "./components/spinner/spinner";
import mockedResponse from "./static/mockedQRNGResponse"

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayHexagrams: false,
      transition: false,
      nowSequenceFuxi: 0,
      futureSequenceFuxi: 0,
      changes: []
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

        // Create the first (current) hexagram
        for (var i = 0; i < 6; i++) {
          var arr = randomNumbers.slice(i * 4, i * 4 + 4); // pick next 4 numbers from our set of 24
          nowSequence[i] = makeLineWithFourCoins(arr);
        }

        // create the second hexagram
        const futureSequence = makeFutureHexagram(nowSequence);

        // convert the lines to a binary sequence of broken and unbroken lines
        const nowSequenceBinary = convertToBinarySequence(nowSequence);
        const futureSequenceBinary = convertToBinarySequence(futureSequence);

        // get fuxi from intermediary "binary" sequence
        const nowSequenceFuxi = binaryToFuxi(nowSequenceBinary) // parseInt(nowSequenceBinary.join(""), 2)
        const futureSequenceFuxi = binaryToFuxi(futureSequenceBinary) //parseInt(futureSequenceBinary.join(""), 2);

        // create a representation of the changes
        const changes = getChanges(nowSequenceBinary, futureSequenceBinary);

        this.setState({
          nowSequenceFuxi,
          futureSequenceFuxi,
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
                initialFuxi={this.state.nowSequenceFuxi}
                changing={this.state.changes}
              />             
              <Hexagram
                initialFuxi={this.state.futureSequenceFuxi}
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
