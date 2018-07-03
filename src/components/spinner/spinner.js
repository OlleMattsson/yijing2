import React from "react";
import "./spinner.css";

export default () => (
  <div style={{ flex: 1 }}>
    <div id="spinner" className="row">
      <div className="sk-double-bounce">
        <div className="sk-child sk-double-bounce1" />
        <div className="sk-child sk-double-bounce2" />
      </div>
    </div>
    <span style={{ fontStyle: "italic" }}>just breathe...</span>
  </div>
);
