import React, { createContext, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import useToggle from "../Hooks/useToggle";
import useInputState from "../Hooks/useInputState";
import axios from "axios";
import { ProfileContext } from "./ProfileContext";

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
  const [title, changeTitle, resetTitle] = useInputState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [link, changeLink, resetLink] = useInputState("");
  const [errors, setErrors] = useState({});
  const { setUpvoteSession, upvoteSession } = useContext(ProfileContext);

  //
  // functions
  const handlePostSection = e => {
    e.preventDefault();
    switch (e.target.name) {
      case "textPost":
        if (linkPost) toggleLinkPost();
        if (mediaPost) toggleMediaPost();
        if (!textPost) toggleTextPost();
        setPostType("textPost");
        break;

      case "mediaPost":
        if (textPost) toggleTextPost();
        if (linkPost) toggleLinkPost();
        if (!mediaPost) toggleMediaPost();
        setPostType("mediaPost");
        break;
      case "linkPost":
        if (mediaPost) toggleMediaPost();
        if (textPost) toggleTextPost();
        if (!linkPost) toggleLinkPost();
        setPostType("linkPost");
        break;

      default:
        break;
    }
  };

  const upvote = (e, postId) => {
    e.preventDefault();
    axios
      .post(`/api/posts/${postId}/upvote`)
      .then(added => {
        if (added.data > 0) {
          setUpvoteSession([...upvoteSession, postId]);
        } else {
          const newSession = upvoteSession.filter(id => id !== postId);
          setUpvoteSession(newSession);
        }
      })
      .catch(e => console.log(e));
  };

  //reset fields
  function resetAllFields() {
    setCommunity("");
    resetTitle();
    setBody("");
    setFile(null);
    resetLink();
    setErrors({});
  }

  // new post
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    const newPost = { title, type: postType, community };

    switch (postType) {
      case "textPost":
        newPost.body = body;
        break;
      case "mediaPost":
        formData.append("file", file);
        break;
      case "linkPost":
        newPost.link = link;
        break;

      default:
        break;
    }
    formData.append("data", JSON.stringify(newPost));

    axios
      .post("/api/posts/new", formData)
      .then(post => {
        resetAllFields();
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
        changeLink,
        changeTitle,
        errors,
        community,
        setCommunity,

        upvote
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
