import React, { createContext, useState } from "react";
import useToggle from "../Hooks/useToggle";
import axios from "axios";
import useInputState from "../Hooks/useInputState";

export const PostContext = createContext();
//
//
//

export function PostProvider(props) {
  // post section hooks
  const [textPost, toggleTextPost] = useToggle(true);
  const [mediaPost, toggleMediaPost] = useToggle(false);
  const [linkPost, toggleLinkPost] = useToggle(false);
  const [postType, setPostType] = useState("textPost");

  // inputs
  const [title, changeTitle] = useInputState("");
  const [body, setBody] = useState("");
  // const [file, setFile] = useState(undefined)  ;
  const [link, changeLink] = useInputState("");
  const [errors, setErrors] = useState({});

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

  const handleSubmit = e => {
    e.preventDefault();
    const newPost = { title };

    switch (postType) {
      case "textPost":
        newPost.body = body;
        break;
      // case "mediaPost":
      //   newPost.file = file;
      //   break;
      case "linkPost":
        newPost.link = link;
        break;
      default:
        console.log("No post type selected!");
    }

    axios
      .post("api/posts/new", newPost)
      .then(post => {
        window.location.assign(`/posts/${post.data._id}`);
      })
      .catch(e => {
        setErrors(e.response.data);
      });
  };

  return (
    <PostContext.Provider
      value={{
        handlePostSection,
        textPost,
        mediaPost,
        linkPost,
        postType,
        setPostType,
        body,
        setBody,
        // file,
        // setFile,
        handleSubmit,
        postType,
        changeLink,
        changeTitle,
        errors
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
