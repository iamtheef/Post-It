import React, { useContext } from "react";
import { PostContext } from "../Context/PostContext";
import "../EditorClasses.css";

export default function Editor() {
  const { body, setBody } = useContext(PostContext);

  function bold(text) {}

  return (
    <textarea
      className="textarea"
      placeholder="Text"
      onChange={setBody}
      value={body}
    ></textarea>
  );
}
