import React, { Component } from "react";
import "./App.css";
import { Line } from "./Line";
import Yin from "./Yin";
import Yang from "./Yang";
import global from "./globals";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Line
          broken={true}
          changing={false}
          yin={props => <Yin {...props} />}
          yang={props => <Yang {...props} />}
          color={global.lineColor}
          changingColor={global.lineColorChanging}
        />
      </div>
    );
  }
}

export default App;
