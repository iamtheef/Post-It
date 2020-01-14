import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Landing";
import PrivProfile from "./Components/PrivProfile";
import PublicProfile from "./Components/PublicProfile";
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
          <PostProvider>
            <Route exact path="/" component={Landing} />
            <Route exact path="/profile" component={PrivProfile} />
            <Route exact path="/profile/:id" component={PublicProfile} />
            <Route exact path="/newpost" component={NewPost} />
            <Route exact path="/posts/:id" component={Post} />
          </PostProvider>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
