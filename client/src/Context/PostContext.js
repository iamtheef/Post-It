import React, { createContext, useState } from "react";
import useToggle from "../Hooks/useToggle";

export const PostContext = createContext();
//
//
//

export function PostProvider(props) {
  //
  // functions
  const handlePostSection = e => {
    e.preventDefault();
    if (e.target.name === "textPost") {
      if (linkPost) toggleLinkPost();
      if (mediaPost) toggleMediaPost();
      if (!textPost) toggleTextPost();
      setPostType("textPost");
    }
    if (e.target.name === "mediaPost") {
      if (textPost) toggleTextPost();
      if (linkPost) toggleLinkPost();
      if (!mediaPost) toggleMediaPost();
      setPostType("mediaPost");
    }
    if (e.target.name === "linkPost") {
      if (mediaPost) toggleMediaPost();
      if (textPost) toggleTextPost();
      if (!linkPost) toggleLinkPost();
      setPostType("linkPost");
    }
  };

  // post section hooks
  const [textPost, toggleTextPost] = useToggle(true);
  const [mediaPost, toggleMediaPost] = useToggle(false);
  const [linkPost, toggleLinkPost] = useToggle(false);
  const [postType, setPostType] = useState("textPost");
  // inputs
  const [body, setBody] = useState("");

  return (
    <PostContext.Provider
      value={{
        handlePostSection,
        textPost,
        mediaPost,
        linkPost,
        postType,
        body,
        setBody
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
