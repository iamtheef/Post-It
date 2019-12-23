import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Landing";

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Navbar></Navbar>
          <Route path="/" component={Landing} />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
