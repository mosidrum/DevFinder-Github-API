import React, { Component } from "react";
import Navbar from "./component/layout/Navbar";
import UserItem from "./component/users/UserItem";
import "./App.css";

class App extends Component {

  render() {
    return (
      <nav className='App'>
        <Navbar />
        <UserItem />
      </nav>
    );
  }
}

export default App;
