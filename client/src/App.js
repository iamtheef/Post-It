import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Landing";
import Profile from "./Components/Profile";
import NewPost from "./Components/NewPost";
import Post from "./Components/Post";
import { PostProvider } from "./Context/PostContext";
import { UserContext } from "./Context/UserContext";

function App() {
  const { setUser, initialUser } = useContext(UserContext);
  useEffect(() => {
    initialUser();
  }, [setUser]);

  return (
    <React.StrictMode>
      <Router>
        <Navbar></Navbar>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/profile" component={Profile} />
          <PostProvider>
            <Route exact path="/newpost" component={NewPost} />
            <Route exact path="/posts/:id" component={Post} />
          </PostProvider>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
