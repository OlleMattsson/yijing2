import React, { Component } from "react";
import Line from "./line/Line";
import { Yin } from "./line/Yin";
import { Yang } from "./line/Yang";
import globals from "../globals";
import {
  fuxiToBinary,
  binaryToKingWen,
  binaryToFuxi,
  binaryToBool
} from "../lib/iching-helpers";
import HexagramData from "./HexagramData";

export default class Hexagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fuxi: this.props.fuxi || 0,
      sequence:
        binaryToBool(fuxiToBinary(this.props.fuxi)) || new Array(6).fill(false), // broken: true / false
      changing: this.props.changing || new Array(6).fill(false),
      interactive: false,
      ...props
    };
  }

  handleLineClick = index => {
    const sequence = this.state.sequence;
    sequence[index] = !sequence[index];
    this.setState({
      sequence: sequence
    });
  };

  handlePrevClick = () => {
    const prev = binaryToFuxi(this.state.sequence) - 1;
    const prevBinary = fuxiToBinary(prev);
    this.setState({ sequence: binaryToBool(prevBinary) });
  };

  handleNextClick = () => {
    const next = binaryToFuxi(this.state.sequence) + 1;
    const nextBinary = fuxiToBinary(next);
    this.setState({ sequence: binaryToBool(nextBinary) });
  };

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
      <div className="hexagram" style={{ flex: 1, margin: "10px" }}>
        {lines}
        <div className="fuxiLabel">
          Fu Xi binary: {binaryToFuxi(this.state.sequence)}
        </div>
        <div className="kingwenLabel">
          King Wen: {binaryToKingWen(this.state.sequence)}
        </div>

        {this.props.withControls ? controls : null}

        <HexagramData fuxi={binaryToFuxi(this.state.sequence)} />
      </div>
    );
  }
}
