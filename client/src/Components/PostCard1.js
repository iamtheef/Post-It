import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ogs from "open-graph-scraper";

import { Link } from "react-router-dom";

export default function PostCard1(props) {
  const post = props.post;

  return (
    <Link to={`/posts/${post._id}`}>
      <div className="is-parent">
        <div className="column body-column">
          <div className="columns">
            <div className="column is-1 sidebar-column is-vcentered">
              <i className="fa fa-arrow-up arrow" aria-hidden="true"></i>
              <i id="dot"> • </i>
              <i className="fa fa-arrow-down arrow" aria-hidden="true"></i>
            </div>
            <article className="tile notification">
              <div className="content">
                <div className="columns">
                  <div className="column is-1">
                    <figure className="image">
                      <img
                        className="is-rounded community-icon-landing"
                        src={post.community.img}
                        alt="community logo"
                      ></img>
                    </figure>
                  </div>

                  <div className="postCard1-header column is-10">
                    <strong>
                      <span
                        style={{
                          color: "#3f3d3e"
                        }}
                      >
                        <span className="underline">
                          <Link to={`/communities/${post.community._id}`}>
                            p/{post.community.name}
                          </Link>
                        </span>
                      </span>
                    </strong>
                    {" • "}
                    Posted by{" "}
                    <Link to={`/profile/${post.user}`}>
                      <span className="underline">{post.user.username}</span>
                    </Link>{" "}
                    {moment(post.date).fromNow()}
                  </div>
                </div>
                <div className="postCard1-body">
                  <p className="postCard1-title">{post.title}</p>
                  {post.type === "textPost" && (
                    <div className="postCard1-body">{post.body}</div>
                  )}
                  {post.type === "mediaPost" && (
                    <figure
                      className="image is-4by5 content"
                      style={{
                        width: "30vw",
                        marginTop: "-10px",
                        marginLeft: "-7px"
                      }}
                    >
                      <img
                        src={`uploads/${post.file.id}/file/${post.file.filename}`}
                      />
                    </figure>
                  )}

                  {post.type === "linkPost" && <img></img>}
                </div>
                <div className="postInfo columns">
                  <div className="postInfoChild column is-3">
                    <p className="infoTitle">
                      <i className="fa fa-comment" aria-hidden="true"></i>{" "}
                      {post.comments.length} comments
                    </p>
                  </div>
                  <div className="postInfoChild column is-3">
                    <p className="infoTitle">
                      <i className="fa fa-trophy" aria-hidden="true"></i> Give
                      Award
                    </p>
                  </div>
                  <div className="postInfoChild column is-3">
                    <p className="infoTitle">
                      <i className="fa fa-trophy" aria-hidden="true"></i> Save
                    </p>
                  </div>
                  <div className="postInfoChild column is-3">
                    <p className="infoTitle">
                      <i className="fa fa-trophy" aria-hidden="true"></i> Share
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Link>
  );
}
