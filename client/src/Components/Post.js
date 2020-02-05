import React from "react";
import PostHeader from "./PostHeader";
import Votings from "./Votings";

export default function Post(props) {
  const { post } = props;

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="columns">
      <Votings element={post} />
      <article className="tile notification pr">
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
                    style={{ marginLeft: "-10vw", width: "35vw" }}
                    src={`../uploads/${post.file.id}/file/${post.file.filename}`}
                    alt="postimg"
                  />
                </figure>
              </div>
            )}

            {post.type === "linkPost" && (
              <div>
                <p className="postCard1-title column is-9">{post.title}</p>
                <div className="link-image column is-3">
                  <img
                    style={{
                      borderRadius: "3px",
                      marginLeft: "10%",
                      borderColor: "blue",
                      border: "solid royalblue 1px"
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
  );
}
