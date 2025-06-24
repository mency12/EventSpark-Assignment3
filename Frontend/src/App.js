import React from "react";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>EventSpark Calculator dev</h1>
        <p>A simple calculator with Express.js backend and React frontend</p>
      </header>
      <main>
        <Calculator />
      </main>
    </div>
  );
}

export default App;
