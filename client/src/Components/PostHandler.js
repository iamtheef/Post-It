import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Post from "./Post";
import PostFooter from "./PostFooter";
import RulesFooter from "./Layout/RulesFooter";
import Comments from "./Layout/Comments";
import CommunityFooter from "./Layout/CommunityFooter";
import Footer from "./Layout/Footer";

export default function PostHandler() {
  const [post, setPost] = useState();

  useEffect(() => {
    axios
      .get(`/api${window.location.pathname}`)
      .then(post => setPost(post.data))
      .catch(e => setPost(e));
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="columns is-centered" style={{ marginTop: "60px" }}>
        <div className="column is-9">
          <div className="is-parent tile notification">
            <div className="is-centered">
              <Post post={post} />
              <PostFooter post={post} />
              <Comments comments={post.comments} />
            </div>
          </div>
        </div>
        <div className="column is-3">
          <CommunityFooter post={post} />
          <RulesFooter post={post} />
          <Footer />
        </div>
      </div>
    </div>
  );
}
