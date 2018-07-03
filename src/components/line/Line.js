import React, { Component } from "react";

export default class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
    this.lineClick = this.lineClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.changing !== this.state.changing) {
      this.setState({ changing: this.props.changing });
    }
  }

  lineClick() {
    this.setState(prevState => ({
      broken: !prevState.broken
    }));
    this.props.onChange(this.props.id);
  }

  render() {
    return (
      <div className={"line-" + this.props.id} onClick={this.lineClick}>
        {this.props.broken
          ? this.props.yin(this.state)
          : this.props.yang(this.state)}
        {}
      </div>
    );
  }
}
