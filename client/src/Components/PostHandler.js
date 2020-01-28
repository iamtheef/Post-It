import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import PostFooter from "./PostFooter";
import Comments from "./Comments";

export default function PostHandler() {
  const [post, setPost] = useState();

  useEffect(() => {
    axios
      .get(`/api${window.location.pathname}`)
      .then(post => setPost(post.data))
      .catch(e => setPost(e));
  });

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="columns is-centered" style={{ marginTop: "60px" }}>
        <div className="column is-8">
          <div className="is-parent tile notification">
            <div className="is-centered">
              <Post post={post} />
              <PostFooter post={post} />
              <Comments comments={post.comments} />
            </div>
          </div>
        </div>

        <div class="tile is-vertical is-4">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile notification">
                <img src={post.community.image} alt="comImage"></img>
                <p class="subtitle">Top tile</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
