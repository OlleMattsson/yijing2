import React, { Component } from "react";

export default class Yin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const color = this.props.changing
      ? this.props.changingColor
      : this.props.color;

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="25">
        <line x2="120" stroke={color} strokeWidth="50" />
        <line x1="180" x2="300" stroke={color} strokeWidth="50" />
      </svg>
    );
  }
}
