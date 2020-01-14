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
  const [upvoteSession, setUpvoteSession] = useState([]);
  const [downVoteSession, setDownVoteSession] = useState([]);

  // inputs
  const [title, changeTitle, resetTitle] = useInputState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [link, changeLink, resetLink] = useInputState("");
  const [errors, setErrors] = useState({});

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
    }
  };

  const upvote = (e, postId) => {
    e.preventDefault();
    axios.post("/:post_id/upvote", postId).then(post => {
      if (post) {
        setUpvoteSession(...upvoteSession, post._id);
      }
    });
  };

  function resetAllFields() {
    setCommunity("");
    resetTitle();
    setBody("");
    setFile(null);
    resetLink();
    setErrors({});
  }

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
        console.log("No post type selected!");
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

  const isUpvoted = id => {
    if (upvoteSession.includes(id)) return true;
    return false;
  };

  const isDownVoted = id => {
    if (downVoteSession.includes(id)) return true;
    return false;
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
        setUpvoteSession,
        upvoteSession,
        isUpvoted,
        upvote,
        setDownVoteSession,
        downVoteSession,
        isDownVoted
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
