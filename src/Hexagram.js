import React, { Component } from "react";
import { Line } from "./components/line/Line";
import Yin from "./components/line/Yin";
import Yang from "./components/line/Yang";
import globals from "./globals";

export default class Hexagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [true, true, true, true, true, true] // broken: true / false
    };
    this.handleLineClick = this.handleLineClick.bind(this);
  }

  componentDidUpdate() {
    console.log("update", this.state);
  }

  handleLineClick(index) {
    const sequence = this.state.sequence;
    sequence[index] = !sequence[index];

    this.setState({
      sequence: sequence
    });
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

  render() {
    const lines = this.state.sequence.map((state, index) => (
      <Line
        id={index}
        key={index}
        broken={state}
        changing={false}
        yin={props => <Yin {...props} />}
        yang={props => <Yang {...props} />}
        color={globals.lineColor}
        changingColor={globals.lineColorChanging}
        onChange={this.handleLineClick}
      />
    ));

    return (
      <div>
        {lines}
        <div>Fu Xi binary: {this.binaryToFuxi(this.state.sequence)}</div>
        <div>King Wen: {this.binaryToKingWen(this.state.sequence)}</div>
      </div>
    );
  }
}
