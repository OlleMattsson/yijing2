import React, { Component } from "react";
import Line from "./components/line/Line";
import Yin from "./components/line/Yin";
import Yang from "./components/line/Yang";
import globals from "./globals";
import {
  fuxiToBinary,
  binaryToKingWen,
  binaryToFuxi
} from "./lib/iching-helpers";

export default class Hexagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fuxi: this.props.fuxi || 0,
      sequence: [true, true, true, true, true, true], // broken: true / false
      changing: [false, false, false, false, false, false],
      interactive: false,
      ...props
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
      const binary = fuxiToBinary(this.state.fuxi);
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
    const prev = binaryToFuxi(this.state.sequence) - 1;
    const prevBinary = fuxiToBinary(prev);
    this.setState({ sequence: this.binaryToBool(prevBinary) });
  }

  handleNextClick() {
    const next = binaryToFuxi(this.state.sequence) + 1;
    const nextBinary = fuxiToBinary(next);
    this.setState({ sequence: this.binaryToBool(nextBinary) });
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
        <button onClick={this.handlePrevClick}>&lt; &lt;</button>
        <button onClick={this.handleNextClick}>&gt; &gt;</button>
      </div>
    );

    return (
      <div className="hexagram">
        {lines}
        <div className="fuxiLabel">
          Fu Xi binary: {binaryToFuxi(this.state.sequence)}
        </div>
        <div className="kingwenLabel">
          King Wen: {binaryToKingWen(this.state.sequence)}
        </div>

        {this.props.withControls ? controls : null}
      </div>
    );
  }
}
