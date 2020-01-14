import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard1 from "./PostCard1";

export default function Landing() {
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);

  const {
    setUpvoteSession,
    isUpvoted,
    setDownVoteSession,
    isDownVoted
  } = useContext(PostContext);

  useEffect(() => {
    axios
      .get("/api/posts/all")
      .then(res => setPosts(res.data))
      .catch(e => setError(e));
  }, [setPosts]);

  useEffect(() => {
    axios
      .get("/api/profile/")
      .then(foundUser => {
        if (foundUser) {
          setUpvoteSession(foundUser.upvotes);
          setDownVoteSession(foundUser.downvoted);
        }
      })
      .catch(e => {
        console.log(e);
      });
  });

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
