import React, { useEffect, useContext, useState, useToggle } from "react";
import { ProfileContext } from "../Context/ProfileContext";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard1 from "./PostCard1";
import UpperFooter from "./UpperFooter";
import Post from "./Post";

export default function Landing() {
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);
  const [postModal, togglePostModal] = useToggle(false);
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
  const showPost = () => {
    togglePostModal();
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
      <p className="is-danger help">{error && error}</p>
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
                    <div onClick={showPost}>
                      <Link to={`/posts/${post._id}`}>
                        <PostCard1
                          post={post}
                          upvoted={isUpvoted(post._id)}
                          downvoted={isDownvoted(post._id)}
                        />
                      </Link>
                      <div
                        className="modal"
                        style={{ display: postModal ? "block" : "none" }}
                      >
                        <div
                          className="modal-background"
                          onClick={togglePostModal}
                        ></div>
                        <div
                          className="modal-content has-background-white is-centered"
                          onClick={() => {
                            if (postModal) togglePostModal();
                          }}
                        >
                          <Post
                            post={post}
                            upvoted={isUpvoted(post._id)}
                            downvoted={isDownvoted(post._id)}
                          />
                        </div>
                      </div>
                    </div>
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
                    <Link to={`/posts/${post._id}`}>
                      <PostCard1
                        post={post}
                        upvoted={isUpvoted(post._id)}
                        downvoted={isDownvoted(post._id)}
                      />
                    </Link>
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
