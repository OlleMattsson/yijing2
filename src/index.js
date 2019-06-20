import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Oracle } from "./components/views/Oracle";
import { HexagramBrowser } from "./components/views/hexagramBrowser";
import { NavigationUI } from "./components/NavigationUI";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cji32l0bm1zkn0156lmp8kl6f"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <NavigationUI />
      <Route path="/" exact component={HexagramBrowser} />
      <Route path="/Oracle/" component={Oracle} />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
