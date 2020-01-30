import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { PostContext } from "../Context/PostContext";
import useToggle from "../Hooks/useToggle";
import axios from "axios";
import PostCard1 from "./PostCard1";
import UpperFooter from "./UpperFooter";
import Footer from "./Footer";
import ModalPost from "./ModalPost";

export default function Landing() {
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);
  const [postModal, togglePostModal] = useToggle(false);

  const { user } = useContext(UserContext);
  const { currentPost, setCurrentPost } = useContext(PostContext);

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
        <div className="column is-6">
          <div className="columns">
            <div className="column is-12">
              <div>
                {user && (
                  <Link to="/newpost">
                    <input
                      className="input"
                      type="text"
                      placeholder="Make a new post"
                    ></input>
                  </Link>
                )}
                <ul>
                  {posts.map(post => (
                    /* all the posts (subs to be implemented) */
                    <li key={post._id}>
                      <div onClick={() => showPost(post)}>
                        <PostCard1 post={post} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

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
                    <ModalPost />
                  </div>
                </div>
              )}
            </div>
            <div className="column is-1">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
