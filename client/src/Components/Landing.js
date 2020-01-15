import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard1 from "./PostCard1";

export default function Landing() {
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);

  const { user } = useContext(UserContext);
  const {
    setUpvoteSession,
    isUpvoted,
    setDownvoteSession,
    isDownVoted
  } = useContext(PostContext);

  useEffect(() => {
    axios
      .get("/api/posts/all")
      .then(res => setPosts(res.data))
      .catch(e => setError(e));

    if (user) {
      setDownvoteSession(user.profile.downvoted);
      setUpvoteSession(user.profile.upvoted);
    }
  }, [setPosts]);

  return (
    <div>
      <div className="container columns is-centered">
        <p className="help is-danger">{error && error}</p>

        <div className="column is-6 is-centered">
          <Link to="/newpost">
            <input
              className="input"
              type="text"
              placeholder="Make a new post"
              style={{ marginTop: "80px" }}
            ></input>
          </Link>

          <ul>
            {posts.map(post => (
              <li key={post._id}>
                <PostCard1
                  post={post}
                  isUpvoted={isUpvoted(post._id)}
                  isDownVoted={isDownVoted(post._id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
