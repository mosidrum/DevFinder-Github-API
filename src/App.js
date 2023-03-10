import React, { Component } from "react";
import Navbar from "./component/layout/Navbar";
import Users from "./component/users/Users";
import Search from "./component/users/Search";
import User from "./component/users/User";
import Alert from "./component/layout/Alert";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";
import "./App.css";
import About from "./component/Pages/About";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };

  //Search Github Users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  //Get a single user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  }


  // Clear Users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 2500);
  };

  render() {
    const { users, user, loading } = this.state;

    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Routes>
            <Route path="/" element = { [<Search
                searchUsers={this.searchUsers}
                clearUsers={this.clearUsers}
                showClear={users.length > 0 ? true : false}
                setAlert={this.setAlert}
              />,
             <Users loading={loading} users={users} /> ] } />
             <Route path="about" element={<About />} />
             <Route path = '/user/:login' element = { <User getUser={this.getUser} user={user} loading = {loading}  /> } />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
