import React, { Component } from "react";

export const Yin = ({ changing, color, changingColor }) => {
  const strokeColor = changing ? changingColor : color;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="25">
      <line x2="120" stroke={color} strokeWidth="50" />
      <line x1="180" x2="300" stroke={strokeColor} strokeWidth="50" />
    </svg>
  );
};
