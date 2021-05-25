import React, { useState } from "react";
import Header from "./components/Header";
import User from "./components/User";
import logoSearch from "./images/search.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

function App() {
  const [username, setUsername] = useState();
  return (
    <Router>
      <div>
        <Header setUsername={setUsername} />
        <Switch>
          <Route path="/users/:id">
            <User username={username} />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Search() {
  return (
    <div className="search">
      <img src={logoSearch} alt="Search" />
      <p className="search-title">Start with searching a GitHub user</p>
    </div>
  );
}

export default withRouter(App);
