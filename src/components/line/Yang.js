import React from "react";

export const Yang = ({isChanging, color, changingColor}) => {
  const strokeColor = isChanging ? changingColor : color;

return (
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="25">
    <line x2="300" stroke={strokeColor} strokeWidth="50" />
  </svg>
);
} 