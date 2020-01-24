import React from "react";
import ModalVotings from "./ModalVotings";
import Post from "./PostCard1";

export default function ModalPost(props) {
  const { post, upvoted, downvoted } = props;

  return (
    <div className="is-parent" style={{ minWidth: "1200px" }}>
      <ModalVotings
        className="modal-votings"
        element={post}
        upvoted={upvoted}
        downvoted={downvoted}
      />
      <Post post={post} upvoted={upvoted} downvoted={downvoted} />
    </div>
  );
}
