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
            <figure className="image">
              <img
                className="is-rounded community-icon-landing"
                src={post.community.img}
                alt="community logo"
              ></img>
            </figure>
            <div className="content">
              <p className="postCard1-header">
                <Link to={`/communities/${post.community._id}`}>
                  <strong>
                    <span
                      style={{
                        color: "#3f3d3e"
                      }}
                    >
                      {post.community.name}
                    </span>
                  </strong>
                </Link>
                {" • "}
                Posted by{" "}
                <Link to={`/profile/${post.user}`}>
                  {post.user.username}
                </Link>{" "}
                {moment(post.date).fromNow()}
              </p>
              <div className="postCard1-body">
                <p className="postCard1-title">{post.title}</p>
                <div className="content">{post.body}</div>
              </div>
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
