import React, { Component } from "react";

export default class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  componentDidUpdate() {
    if (this.props.isChanging !== this.state.isChanging) {
      this.setState({ isChanging: this.props.isChanging });
    }
  }

  lineClick = () => {
    this.setState(prevState => ({
      broken: !prevState.broken
    }));
    this.props.onChange(this.props.id);
  }

  render() {
    return (
      <div className={"line-" + this.props.id} onClick={this.lineClick}>
        {this.props.isYang
          ? this.props.yang(this.state)
          : this.props.yin(this.state)
          }
        {}
      </div>
    );
  }
}
