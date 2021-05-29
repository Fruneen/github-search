import React, { useState } from "react";
import Header from "./components/Header/Header";
import User from "./components/User/User";
import Search from "./screens/Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import "./styles/index.css";

function App() {
  const [username, setUsername] = useState();
  return (
    <Router>
      <main className="main">
        <Header setUsername={setUsername} />
        <Switch>
          <Route path="/users/:id">
            <User username={username} />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
export default withRouter(App);
