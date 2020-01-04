import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import useToggle from "../Hooks/useToggle";
import useInputState from "../Hooks/useInputState";
import axios from "axios";

export const PostContext = createContext();

export function PostProvider(props) {
  //
  //
  const history = useHistory();
  //
  // post section hooks
  const [textPost, toggleTextPost] = useToggle(true);
  const [mediaPost, toggleMediaPost] = useToggle(false);
  const [linkPost, toggleLinkPost] = useToggle(false);
  const [postType, setPostType] = useState("textPost");
  const [community, setCommunity] = useState("");

  // inputs
  const [title, changeTitle] = useInputState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState({});
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
    const newPost = { title, type: postType, community };

    switch (postType) {
      case "textPost":
        newPost.body = body;
        break;
      case "mediaPost":
        const formData = new FormData();
        formData.append("file", file);

        newPost.file = file.File;

        break;
      case "linkPost":
        newPost.link = link;
        break;
      default:
        console.log("No post type selected!");
    }

    axios
      .post("/api/posts/new", newPost)
      .then(post => {
        history.push(`/posts/${post.data._id}`);
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
        file,
        setFile,
        handleSubmit,
        postType,
        changeLink,
        changeTitle,
        errors,
        community,
        setCommunity
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
