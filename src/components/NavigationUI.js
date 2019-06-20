import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export const NavigationUI = () => (
  <nav className="nav">
    <ul>
      <li>
        <ActiveLink exact={true} to="/" label="Yi Jing" />
        {" | "}
      </li>
      <li>
        <ActiveLink to="/oracle/" label="Oracle" />
      </li>
    </ul>
  </nav>
);

const ActiveLink = ({ label, to, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <div className={match ? "active" : ""}>
        <Link to={to}>{label}</Link>
      </div>
    )}
  />
);
