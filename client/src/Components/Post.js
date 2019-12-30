import React, { useEffect, useContext } from "react";
import axios from "axios";
import { PostContext } from "../Context/PostContext";

export default function Post() {
  const { currentPost } = useContext(PostContext);

  // useEffect(() => {
  //   axios.get(`api/posts/${id}`);
  // });
  return (
    <div>
      {/* <h3>{post.title}</h3>
      <p>{post.body}</p> */}
      <h1>{currentPost.title}</h1>
    </div>
  );
}
