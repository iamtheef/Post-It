import React, { useEffect, useState } from "react";

export default function PostCard1(props) {
  const post = props.post;
  console.log(post);
  switch (post.type) {
    case "textPost":
      return (
        <div className="columns">
          <div className="column is-full">
            <p className="postCard1-header">Posted by {post.username}</p>
          </div>
        </div>
      );

    case "mediaPost":
      return (
        <div>
          <p style={{ fontSize: "20px" }}>{post.type}</p>
        </div>
      );
    case "linkPost":
      return (
        <div>
          <p style={{ fontSize: "20px" }}>{post.type}</p>
        </div>
      );

    default:
      return <p>undefined post</p>;
  }
}
