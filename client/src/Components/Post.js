import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Post(props) {
  const postId = props.match.params.id;
  const [post, setPost] = useState({});
  useEffect(() => {
    axios
      .get(`/api/posts/${postId}`)
      .then(res => {
        setPost(res.data);
        console.log(res);
      })
      .catch(e => console.log(e));
  }, [setPost]);

  return (
    <div>
      <div style={{ display: post ? "block" : "none" }}>
        <h1 style={{ marginTop: "200px" }}>{post.title}</h1>
        <h4>{post.body ? post.body : "other type of post"}</h4>
      </div>
    </div>
  );
}
