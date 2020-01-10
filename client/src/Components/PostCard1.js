import React from "react";
import moment from "moment";

import { Link } from "react-router-dom";

export default function PostCard1(props) {
  const post = props.post;

  return (
    <Link to={`/posts/${post._id}`}>
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
                    <span className="underline">p/{post.community.name}</span>
                  </span>
                </strong>
              </Link>
              {" • "}
              Posted by{" "}
              <Link to={`/profile/${post.user}`}>
                <span className="underline">{post.user.username}</span>
              </Link>{" "}
              {moment(post.date).fromNow()}
            </p>
            <div className="postCard1-body">
              <p className="postCard1-title">{post.title}</p>
              {post.type === "textPost" && (
                <div className="content">{post.body}</div>
              )}
              {post.type === "mediaPost" && (
                <figure className="image is-128x128 content">
                  <img src={`../../../${post.file}`} />
                </figure>
              )}

              {post.type === "linkPost" && <iframe src=""></iframe>}
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}
