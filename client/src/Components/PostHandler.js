import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

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

  return <Post post={post} upvoted={post.upvoted} downvoted={post.downvoted} />;
}
