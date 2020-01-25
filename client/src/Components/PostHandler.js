import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

export default function PostHandler(props) {
  const [post, setPost] = useState();

  console.log(window.location.pathname);
  useEffect(() => {
    axios
      .get(`localhost:3000/api${window.location.pathname}`)
      .then(post => {
        setPost(post);
      })
      .catch(e => console.log(e));
  });

  return (
    <Post post={post} upvoted={props.upvoted} downvoted={props.downvoted} />
  );
}
