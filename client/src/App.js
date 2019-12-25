import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Landing";
import Profile from "./Components/Profile";
import NewPost from "./Components/NewPost";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar></Navbar>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/newpost" component={NewPost} />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
