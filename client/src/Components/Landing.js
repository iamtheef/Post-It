import React, { useEffect, useContext, useState } from "react";
import { ProfileContext } from "../Context/ProfileContext";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard1 from "./PostCard1";

export default function Landing() {
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);

  const { user } = useContext(UserContext);
  const {
    initializeProfile,
    setProfile,
    isUpvoted,
    setDownvoteSession,
    setUpvoteSession
  } = useContext(ProfileContext);

  useEffect(() => {
    axios
      .get("/api/posts/all")
      .then(res => setPosts(res.data))
      .catch(e => setError(e));
    initializeProfile();
  }, [setUpvoteSession, setDownvoteSession]);

  return (
    <div>
      <footer className="upFooter">
        <p className="help is-danger">{error && error}</p>
        <div>
          VIEW:
          <span className="button is-static">
            <i
              className="fa fa-square"
              aria-hidden="true"
              style={{ marginLeft: "10px" }}
            ></i>
          </span>
          <span className="button is-static">
            <i
              className="fa fa-bars"
              aria-hidden="true"
              style={{ marginLeft: "10px" }}
            ></i>
          </span>
        </div>
      </footer>
      <div className="container columns is-centered">
        <div className="column is-6 is-centered">
          {user ? (
            <div>
              <Link to="/newpost">
                <input
                  className="input"
                  type="text"
                  placeholder="Make a new post"
                ></input>
              </Link>
              <ul>
                {posts.map(post => (
                  /* all the posts if someone is connected */
                  <li key={post._id}>
                    <PostCard1 post={post} upvoted={isUpvoted(post._id)} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            /* all the posts if no one is connected */
            <div>
              <ul>
                {posts.map(post => (
                  <li key={post._id}>
                    <PostCard1 post={post} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
