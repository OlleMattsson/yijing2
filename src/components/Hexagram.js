import React, { Component, useState, useEffect } from "react";
import { Line } from "./line/Line";
import { Yin } from "./line/Yin";
import { Yang } from "./line/Yang";
import globals from "../globals";
import {
  fuxiToBinary,
  binaryToKingWen,
  binaryToFuxi,
  binaryToBool,
  boolToBinary
} from "../lib/iching-helpers";
import HexagramData from "./HexagramData";

export const Hexagram = ({
  initialFuxi = 0,
  changing = new Array(6).fill(false),
  interactive = false,
  withControls = false 
}) => {
  // Fuxi (number) internal state
  const [fuxi, setFuxi] = useState(initialFuxi);

  /*
    UI event Handlers
  */
  const handleLineClick = index => {
    const currentBoolSequence = binaryToBool(fuxiToBinary(fuxi)); // number => Array|bool]
    currentBoolSequence[index] = !currentBoolSequence[index];
    const nextFuxi = binaryToFuxi(boolToBinary(currentBoolSequence)); // Array[bool] => number
    setFuxi(nextFuxi);
  };

  const handlePrevClick = () => {
    if (fuxi === 0) {
      setFuxi(63);
      return;
    }
    setFuxi(fuxi - 1);
  };

  const handleNextClick = () => {
    if (fuxi === 63) {
      setFuxi(0);
      return;
    }
    setFuxi(fuxi + 1);
  };

  //  Create sequence and reverse it for rendering
  const sequence = binaryToBool(fuxiToBinary(fuxi));
  const reversedSequence = Array.from(sequence).reverse();
  const reversedChanging = Array.from(changing).reverse();

  // render the lines
  const lines = reversedSequence.map((isYang, index) => {
    const id = sequence.length - 1 - index;
    return (
      <Line
        id={id}
        key={id}
        isYang={isYang}
        isChanging={reversedChanging[index]}
        Yin={props => <Yin {...props} />}
        Yang={props => <Yang {...props} />}
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
      <div className="fuxiLabel">Fu Xi binary: {fuxi}</div>
      <div className="kingwenLabel">
        King Wen: {binaryToKingWen(fuxiToBinary(fuxi))}
      </div>
      {withControls ? controls : null}
      <HexagramData fuxi={fuxi} />
    </div>
  );
};
