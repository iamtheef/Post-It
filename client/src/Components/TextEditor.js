import React, { useContext } from "react";
import { PostContext } from "../Context/PostContext";
import { Editor } from "draft-js";

export default function TextEditor() {
  const { body, setBody } = useContext(PostContext);
  return <Editor editorState={body} onChange={setBody} />;
}
