import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { UserProvider } from "./Context/UserContext";

class App extends Component {
  render() {
    return (
      <Router>
        <UserProvider>
          <div className="App">
            <Navbar></Navbar>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
        </UserProvider>
      </Router>
    );
  }
}

export default App;
