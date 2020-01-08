import React, { useEffect, useState } from "react";
import moment from "moment";

import { Link } from "react-router-dom";

export default function PostCard1(props) {
  const post = props.post;

  switch (post.type) {
    case "textPost":
      return (
        <div className="is-parent">
          <article className="tile notification">
            <div className="content">
              <p className="postCard1-header">
                <Link to="/communities/:id">{post.community}</Link>
                {" • "}
                Posted by{" "}
                <Link to={`/profile/${post.user}`}>{post.username}</Link>{" "}
                {moment(post.date).fromNow()}
              </p>
              <p className="postCard1-title">{post.title}</p>
              <div className="content">{post.body}</div>
            </div>
          </article>
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
