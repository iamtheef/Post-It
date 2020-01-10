import React from "react";
import moment from "moment";

import { Link } from "react-router-dom";

export default function PostCard1(props) {
  const post = props.post;

  return (
    <Link to={`/posts/${post._id}`}>
      <div className="postCard1-sidebar"></div>
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
                <figure
                  className="image is-4by5 content"
                  style={{ width: "30vw", marginTop: "-10px" }}
                >
                  <img
                    src={`uploads/${post.file.id}/file/${post.file.filename}`}
                  />
                </figure>
              )}

              {post.type === "linkPost" && <iframe src=""></iframe>}
            </div>
            <div className="postInfo columns">
              <div className="postInfoChild column is-1">
                <i class="fa fa-comment" aria-hidden="true" />
                <p className="infoTitle">{post.comments.length} comments</p>
              </div>
              <div className="postInfoChild column is-1">
                <i class="fa fa-trophy" aria-hidden="true" />
                <p className="infoTitle">Give Award</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}
