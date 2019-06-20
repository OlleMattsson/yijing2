import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Oracle } from "./components/views/Oracle";
import { HexagramBrowser } from "./components/views/hexagramBrowser";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cji32l0bm1zkn0156lmp8kl6f"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Yi Jing</Link>
              {" | "}
            </li>
            <li>
              <Link to="/oracle/">Oracle</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={HexagramBrowser} />
        <Route path="/Oracle/" component={Oracle} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
