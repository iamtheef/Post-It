import React from "react";
import moment from "moment";

import { Link } from "react-router-dom";

export default function PostCard1(props) {
  const post = props.post;

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

                  <p className="postCard1-header column is-10">
                    <Link to={`/communities/${post.community._id}`}>
                      <strong>
                        <span
                          style={{
                            color: "#3f3d3e"
                          }}
                        >
                          <span className="underline">
                            p/{post.community.name}
                          </span>
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

                  {post.type === "linkPost" && (
                    <iframe
                      width="500vw"
                      height="300"
                      scrolling="no"
                      frameborder="no"
                      allow="autoplay"
                      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/237079253&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                    ></iframe>
                  )}
                </div>
                <div className="postInfo columns">
                  <div className="postInfoChild column">
                    <i class="fa fa-comment" aria-hidden="true" />
                    <p className="infoTitle">{post.comments.length} comments</p>
                  </div>
                  <div className="postInfoChild column">
                    <i class="fa fa-trophy" aria-hidden="true" />
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
