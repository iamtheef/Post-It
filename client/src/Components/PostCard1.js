import React from "react";
import Votings from "./Votings";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export default function PostCard1(props) {
  const { post } = props;

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
          <Votings element={post} />
          <article className="tile notification">
            <div className="content">
              <PostHeader post={post} />
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
                        className="img"
                        style={{ marginLeft: "-15%", width: "100%" }}
                        src={`uploads/${post.file.id}/file/${post.file.filename}`}
                        alt="postimg"
                      />
                    </figure>
                  </div>
                )}

                {post.type === "linkPost" && (
                  <div>
                    <p className="postCard1-title column is-9">{post.title}</p>
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

              <PostFooter post={post} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
