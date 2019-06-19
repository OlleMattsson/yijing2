import React, { Component, useState } from "react";
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

export const Hexagram = ({
  fuxi,
  interactive,
  changing = new Array(6).fill(false),
  withControls
}) => {
  const [sequence, setSequence] = useState(
    binaryToBool(fuxiToBinary(fuxi || 0)) || new Array(6).fill(false) // broken: true / false
  );

  const handleLineClick = index => {
    const _sequence = [...sequence];
    _sequence[index] = !_sequence[index];
    setSequence(_sequence);
  };

  const handlePrevClick = () => {
    const prev = binaryToFuxi(sequence) - 1;
    const prevBinary = fuxiToBinary(prev);
    setSequence(binaryToBool(prevBinary));
  };

  const handleNextClick = () => {
    const next = binaryToFuxi(sequence) + 1;
    const nextBinary = fuxiToBinary(next);
    setSequence(binaryToBool(nextBinary));
  };

  // do the reversing first, to avoid flickering
  const reversedSequence = Array.from(sequence).reverse();
  const reversedChanging = Array.from(changing).reverse();

  const lines = reversedSequence.map((isYang, index) => {
    const id = sequence.length - 1 - index;
    return (
      <Line
        id={id}
        key={id}
        isYang={isYang}
        isChanging={reversedChanging[index]}
        yin={props => <Yin {...props} />}
        yang={props => <Yang {...props} />}
        color={globals.lineColor}
        changingColor={globals.lineColorChanging}
        onChange={interactive ? handleLineClick : () => {}}
      />
    );
  });

  const controls = (
    <div>
      <button onClick={handlePrevClick}>&lt; &lt;</button>
      <button onClick={handleNextClick}>&gt; &gt;</button>
    </div>
  );

  return (
    <div className="hexagram" style={{ flex: 1, margin: "10px" }}>
      {lines}
      <div className="fuxiLabel">Fu Xi binary: {binaryToFuxi(sequence)}</div>
      <div className="kingwenLabel">King Wen: {binaryToKingWen(sequence)}</div>

      {withControls ? controls : null}

      <HexagramData fuxi={binaryToFuxi(sequence)} />
    </div>
  );
};
