import React, { Component } from "react";

export class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props
    };
    this.lineClick = this.lineClick.bind(this);
  }

  lineClick() {
    this.setState(prevState => ({
      broken: !prevState.broken
    }));
  }

  render() {
    return (
      <div className={"line"} onClick={this.lineClick}>
        {this.state.broken
          ? this.props.yin(this.state)
          : this.props.yang(this.state)}
        {}
      </div>
    );
  }
}
