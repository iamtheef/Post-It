import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ogs from "open-graph-scraper";

import { Link } from "react-router-dom";

export default function PostCard1(props) {
  const post = props.post;
  console.log(post);

  const [metadata, setMetadata] = useState();
  if (post.link) {
    // useEffect(post => {
    //   axios.get(
    //     "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=S55hwA2RjHY&format=json"
    //   );
    // });
  }

  return (
    <Link to={`/posts/${post._id}`}>
      <div className="is-parent">
        <div className="column body-column">
          <div className="columns">
            <div className="column is-1 sidebar-column"></div>
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
                  <div className="postInfoChild column">
                    <i className="fa fa-comment" aria-hidden="true" />
                    <p className="infoTitle">{post.comments.length} comments</p>
                  </div>
                  <div className="postInfoChild column">
                    <i className="fa fa-trophy" aria-hidden="true" />
                    <p className="infoTitle">Give Award</p>
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
