import React, { Component } from "react";
import Navbar from "./component/layout/Navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <nav className='App'>
        <Navbar />
      </nav>
    );
  }
}

export default App;
