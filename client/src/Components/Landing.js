import React, { useEffect, useContext, useState } from "react";
import useToggle from "../Hooks/useToggle";
import { ProfileContext } from "../Context/ProfileContext";
import { UserContext } from "../Context/UserContext";
import { Link, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import PostCard1 from "./PostCard1";
import UpperFooter from "./UpperFooter";
import ModalPost from "./ModalPost";

export default function Landing() {
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);
  const [postModal, togglePostModal] = useToggle(false);
  const history = useHistory();

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

  const showPost = id => {
    window.history.pushState({ urlPath: "" }, "", `/posts/${id}`);
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
                    <div onClick={() => showPost(post._id)}>
                      <PostCard1
                        post={post}
                        upvoted={isUpvoted(post._id)}
                        downvoted={isDownvoted(post._id)}
                      />
                    </div>

                    <div
                      className="modal"
                      style={{ display: postModal ? "block" : "none" }}
                    >
                      <div
                        className="modal-background"
                        onClick={closePostModal}
                      ></div>
                      <div className="modal-content has-background-white modal-unzoom modalPost">
                        <ModalPost
                          post={post}
                          upvoted={isUpvoted(post._id)}
                          downvoted={isDownvoted(post._id)}
                        />
                      </div>
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
                  <div onClick={showPost}>
                    <Link to={`/posts/${post._id}`}>
                      <PostCard1
                        post={post}
                        upvoted={isUpvoted(post._id)}
                        downvoted={isDownvoted(post._id)}
                      />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
