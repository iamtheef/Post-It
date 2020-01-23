import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Votings from "./Votings";

export default function Post(props) {
  const { post, upvoted, downvoted } = props;

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="is-parent">
      <div className="column body-column">
        <div className="columns">
          <Votings element={post} upvoted={upvoted} downvoted={downvoted} />
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

              <Link to={`/posts/${post._id}`}>
                <div className="columns">
                  {post.type === "textPost" && (
                    <div className="column is-12">
                      <p className="postCard1-title">{post.title}</p>
                      <div
                        dangerouslySetInnerHTML={{ __html: post.body }}
                        className="row"
                      />
                    </div>
                  )}
                  {post.type === "mediaPost" && (
                    <div className="column is-14">
                      <p className="postCard1-title">{post.title}</p>
                      <figure>
                        <img
                          style={{ marginLeft: "-15%", width: "100%" }}
                          src={`uploads/${post.file.id}/file/${post.file.filename}`}
                          alt="postimg"
                        />
                      </figure>
                    </div>
                  )}

                  {post.type === "linkPost" && (
                    <div>
                      <p className="postCard1-title column is-9">
                        {post.title}
                      </p>
                      <div className="link-image column is-4">
                        <img
                          style={{
                            borderRadius: "3px"
                          }}
                          alt="metadata"
                          src={post.metadata.ogImage.url}
                        ></img>
                      </div>

                      <div id="blue-fade">
                        {post.metadata.ogUrl.slice(12, 35) + "...          "}
                        <i className="fa fa-link" aria-hidden="true"></i>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
