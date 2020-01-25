import React from "react";
import PostHeader from "./PostHeader";
import Votings from "./Votings";

export default function Post(props) {
  const { post, upvoted, downvoted } = props;

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="body-column">
      <div className="columns">
        <Votings element={post} upvoted={upvoted} downvoted={downvoted} />
        <article className="tile notification">
          <div className="content">
            <PostHeader post={post} />

            <div className="columns">
              {post.type === "textPost" && (
                <div className="column is-12">
                  <p className="postCard1-title">{post.title}</p>
                  <div dangerouslySetInnerHTML={{ __html: post.body }} />
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
          </div>
        </article>
      </div>
    </div>
  );
}
