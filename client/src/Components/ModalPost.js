import React from "react";
import ModalVotings from "./ModalVotings";
import Post from "./Post";
import PostFooter from "./PostFooter";
import Comments from "./Comments";

export default function ModalPost(props) {
  const { post, upvoted, downvoted } = props;

  return (
    <div>
      <div
        className="columns is-parent tile notification"
        style={{ marginTop: "40px" }}
      >
        <div className="column is-10">
          <ModalVotings
            className="modal-votings"
            element={post}
            upvoted={upvoted}
            downvoted={downvoted}
          />
          <Post post={post} />
          <PostFooter post={post} />
          <Comments comments={post.comments} />
        </div>
        <div className="tile is-3 modalfooter pr">
          <div className="tile pr">
            <div className="tile is-parent pr">
              <article className="tile notification pr">
                <img
                  src={post.community.img}
                  alt="comImage"
                  className="modal-tile-image"
                ></img>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
