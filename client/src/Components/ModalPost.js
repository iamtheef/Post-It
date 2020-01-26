import React from "react";
import ModalVotings from "./ModalVotings";
import Post from "./Post";
import PostFooter from "./PostFooter";
import Comments from "./Comments";

export default function ModalPost(props) {
  const { post, upvoted, downvoted } = props;

  return (
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
    </div>
  );
}
