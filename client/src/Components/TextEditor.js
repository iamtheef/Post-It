import React, { useContext } from "react";
import { PostContext } from "../Context/PostContext";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

function TextEditor() {
  const { body, setBody } = useContext(PostContext);

  return (
    <ReactQuill
      value={body}
      style={{ height: "80px" }}
      onChange={setBody}
      placeholder="Write your post here"
    />
  );
}

export default TextEditor;
