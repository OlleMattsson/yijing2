import React, { Component } from "react";

export const Line = ({id, isYang, onChange, Yin, Yang, isChanging, color, changingColor}) => {

  const lineClick = () => {
    onChange(id);
  }
  
  return (
    <div className={"line-" + id} onClick={lineClick}>
      {isYang
        ? <Yang isChanging={isChanging} color={color} changingColor={changingColor}/>
        : <Yin isChanging={isChanging} color={color} changingColor={changingColor}/>
        }
    </div>
  );
}
