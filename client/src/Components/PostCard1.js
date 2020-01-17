import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { PostContext } from "../Context/PostContext";

export default function PostCard1(props) {
  const { post, isUpvoted, isDownvoted } = props;
  const { upvote } = useContext(PostContext);

  if (post.type === "textPost") {
    const postLength = post.body.length;
    var postHeight = "100px";
    if (postLength > 200) {
      postHeight = "170px";
    }
  }

  return (
    <div className="is-parent">
      <div className="column body-column">
        <div className="columns">
          <div
            className="column is-1 sidebar-column is-vcentered"
            onClick={e => upvote(e, post._id)}
          >
            <i
              className={`fa fa-arrow-up arrow ${isUpvoted && "upvoted"}`}
              aria-hidden="true"
            ></i>
            <div id="postKarma">
              {post.karma <= 1 ? <i> • </i> : post.karma}
            </div>
            <i
              className={`fa fa-arrow-down arrow ${isDownvoted && "downvoted"}`}
              aria-hidden="true"
            ></i>
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

              <Link to={`/posts/${post._id}`}>
                <div className="columns">
                  {post.type === "textPost" && (
                    <div className="column is-12">
                      <p className="postCard1-title">{post.title}</p>
                      <div
                        dangerouslySetInnerHTML={{ __html: post.body }}
                        className="row"
                        style={{ height: postHeight, overflow: "hidden" }}
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
                            borderRadius: "3px",

                            width: "20vw"
                          }}
                          src={post.metadata.ogImage.url}
                        ></img>
                      </div>

                      <a href={post.metadata.ogUrl} target="blank">
                        <div id="blue-fade">
                          {post.metadata.ogUrl.slice(12, 35) + "...          "}
                          <i class="fa fa-link" aria-hidden="true"></i>
                        </div>
                      </a>
                    </div>
                  )}
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

                  <div className="postInfoChild column is-2">
                    <p className="infoTitle">
                      <i className="fa fa-bookmark" aria-hidden="true"></i> Save
                    </p>
                  </div>
                  <div className="postInfoChild column is-3">
                    <p className="infoTitle" id="share-icon">
                      <i className="fa fa-share" aria-hidden="true"></i> Share
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
