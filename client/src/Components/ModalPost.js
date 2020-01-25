import React from "react";
import ModalVotings from "./ModalVotings";
import Post from "./Post";

export default function ModalPost(props) {
  const { post, upvoted, downvoted } = props;

  return (
    <div>
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
