import React, { useEffect, useContext, useState } from "react";
import { ProfileContext } from "../Context/ProfileContext";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard1 from "./PostCard1";
import UpperFooter from "./UpperFooter";

export default function Landing() {
  const [setError] = useState();
  const [posts, setPosts] = useState([]);

  const { user } = useContext(UserContext);
  const { initializeProfile, upvoteSession, downvoteSession } = useContext(
    ProfileContext
  );
  const isUpvoted = id => {
    return upvoteSession.includes(id);
  };

  const isDownvoted = id => {
    return downvoteSession.includes(id);
  };
  useEffect(() => {
    axios
      .get("/api/posts/all")
      .then(res => setPosts(res.data))
      .catch(e => setError(e));
    initializeProfile();
  }, [user]);

  return (
    <div>
      <UpperFooter />

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
                    <PostCard1
                      post={post}
                      upvoted={isUpvoted(post._id)}
                      downvoted={isDownvoted(post._id)}
                    />
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
