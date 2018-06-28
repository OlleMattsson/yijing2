import React, { Component } from "react";
import { Line } from "./components/line/Line";
import Yin from "./components/line/Yin";
import Yang from "./components/line/Yang";
import globals from "./globals";

export default class Hexagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [true, true, true, true, true, true],
      changing: [false, false, false, false, false, false],
      ...props // broken: true / false
    };
    this.handleLineClick = this.handleLineClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentDidUpdate() {
    //console.log("update", this.state.sequence);
  }

  componentDidMount() {
    if (this.state.fuxi) {
      console.log(this.state.fuxi);
      const binary = this.fuxiToBinary(this.state.fuxi);
      this.setState({ sequence: this.binaryToBool(binary) });
    }
  }

  handleLineClick(index) {
    const sequence = this.state.sequence;
    sequence[index] = !sequence[index];
    this.setState({
      sequence: sequence
    });
  }

  handlePrevClick() {
    const prev = this.binaryToFuxi(this.state.sequence) - 1;
    const prevBinary = this.fuxiToBinary(prev);
    this.setState({ sequence: this.binaryToBool(prevBinary) });
  }

  handleNextClick() {
    const next = this.binaryToFuxi(this.state.sequence) + 1;
    const nextBinary = this.fuxiToBinary(next);
    this.setState({ sequence: this.binaryToBool(nextBinary) });
  }

  fuxiToBinary(fuxi) {
    // Number => Sequence<Array[Bool]>
    // eg. 3 -> [0,0,0,0,1,1]
    var bin = "",
      arr = [],
      length = 6;

    while (length--) {
      bin += (fuxi >> length) & 1;
    }

    arr = bin.split("");
    return arr;
  }

  binaryToKingWen(source) {
    // source: Array[<Bool>]
    let kingWenSequence = globals.kingWenSequence;
    if (source && source.length == 6) {
      return kingWenSequence[this.binaryToFuxi(source)];
    }
  }

  binaryToFuxi(source) {
    return parseInt(
      source
        .map(broken => {
          return broken ? 0 : 1;
        })
        .join(""),
      2
    );
  }

  binaryToBool(arr) {
    return arr.map(el => {
      return el === "1" ? false : true;
    });
  }

  render() {
    const sequenceCopy = Array.from(this.state.sequence);
    const changingCopy = Array.from(this.state.changing).reverse();

    const lines = sequenceCopy.reverse().map((state, index) => {
      const id = this.state.sequence.length - 1 - index;
      return (
        <Line
          id={id}
          key={id}
          broken={state}
          changing={changingCopy[index]}
          yin={props => <Yin {...props} />}
          yang={props => <Yang {...props} />}
          color={globals.lineColor}
          changingColor={globals.lineColorChanging}
          onChange={this.state.interactive ? this.handleLineClick : () => {}}
        />
      );
    });

    const controls = (
      <div>
        <button onClick={this.handlePrevClick}>
          &lt; &lt; {this.binaryToFuxi(this.state.sequence) - 1}{" "}
        </button>
        <button onClick={this.handleNextClick}>
          {this.binaryToFuxi(this.state.sequence) + 1} &gt; &gt;
        </button>
      </div>
    );

    return (
      <div>
        {lines}
        <div>Fu Xi binary: {this.binaryToFuxi(this.state.sequence)}</div>
        <div>King Wen: {this.binaryToKingWen(this.state.sequence)}</div>

        {this.props.withControls ? controls : null}
      </div>
    );
  }
}
