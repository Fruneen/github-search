import React, { useState } from "react";
import Header from "./components/Header";
import "./styles/reset.css";

function App() {
  const [user, setUser] = useState("");
  return (
    <div>
      <Header setUser={setUser} />
      <p> Current user: {user}</p>
    </div>
  );
}

export default App;
