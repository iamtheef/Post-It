import React, { useContext } from "react";
import { PostContext } from "../Context/PostContext";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

function ComAdder() {
  const { comment, setComment, addComment } = useContext(PostContext);

  return (
    <div>
      <ReactQuill
        className="pr"
        value={comment}
        onChange={setComment}
        placeholder="Write your comment here"
      />

      <button
        className="button is-pulled-right is-dark"
        style={{ marginTop: "10px" }}
        onClick={addComment}
      >
        Reply
      </button>
    </div>
  );
}

export default ComAdder;
