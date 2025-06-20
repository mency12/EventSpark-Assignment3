import React from "react";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>EventSpark Calculator dev1</h1>
        <p>A simple calculator with Spring Boot backend and React frontend</p>
      </header>
      <main>
        <Calculator />
      </main>
    </div>
  );
}

export default App;
