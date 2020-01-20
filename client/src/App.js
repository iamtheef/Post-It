import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Landing";
import PrivProfile from "./Components/PrivProfile";
import PublicProfile from "./Components/PublicProfile";
import NewPost from "./Components/NewPost";
import Post from "./Components/Post";
import { UserContext } from "./Context/UserContext";
import { ProfileContext } from "./Context/ProfileContext";
import { PostProvider } from "./Context/PostContext";

function App() {
  const { setUser, initialUser } = useContext(UserContext);
  const { initializeProfile } = useContext(ProfileContext);

  useEffect(() => {
    initialUser();
    initializeProfile();
  }, [setUser]);

  return (
    <Router>
      <PostProvider>
        <Navbar></Navbar>
        <div className="App">
          <Route exact path="/profile" component={PrivProfile} />
          <Route exact path="/profile/:id" component={PublicProfile} />
          <Route exact path="/newpost" component={NewPost} />
          <Route exact path="/posts/:id" component={Post} />

          <Route exact path="/" component={Landing} />
        </div>
      </PostProvider>
    </Router>
  );
}

export default App;
