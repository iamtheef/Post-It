import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import useToggle from "../Hooks/useToggle";
import axios from "axios";
import PostCard1 from "./PostCard1";
import UpperFooter from "./UpperFooter";
import ModalPost from "./ModalPost";

export default function Landing() {
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(posts[0]);
  const [postModal, togglePostModal] = useToggle(false);

  const { user, upvoteSession, downvoteSession } = useContext(UserContext);

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
  }, [user]);

  const showPost = post => {
    setCurrentPost(post);
    window.history.pushState({ urlPath: "" }, "", `/posts/${post._id}`);
    togglePostModal();
  };

  const closePostModal = () => {
    window.history.pushState({ urlPath: "" }, "", `/`);
    togglePostModal();
  };

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
                    <div onClick={() => showPost(post)}>
                      <PostCard1
                        post={post}
                        upvoted={isUpvoted(post._id)}
                        downvoted={isDownvoted(post._id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            /* all the posts if no one is connected */
            <ul>
              {posts.map(post => (
                <li key={post._id}>
                  <div onClick={() => showPost(post)}>
                    <PostCard1
                      post={post}
                      upvoted={isUpvoted(post._id)}
                      downvoted={isDownvoted(post._id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {currentPost && (
            <div
              className="modal"
              style={{ display: postModal ? "block" : "none" }}
            >
              <div
                className="modal-background modalPost-mt"
                onClick={closePostModal}
              ></div>
              <div className="modal-content modalPost">
                <ModalPost
                  post={currentPost}
                  upvoted={isUpvoted(currentPost._id)}
                  downvoted={isDownvoted(currentPost._id)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
