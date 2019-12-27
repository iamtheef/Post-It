import React, { useEffect, useState } from "react";
import useToggle from "../Hooks/useToggle";
import useInputState from "../Hooks/useInputState";
import axios from "axios";

function NewPost() {
  // communities hooks
  const [dropdown, toggleDropdown] = useToggle(false);
  const [communities, setCommunities] = useState([]);
  const [com, setCom] = useState(undefined);
  const [icon, setIcon] = useState(undefined);

  // post section hooks
  const [textPost, toggleTextPost] = useToggle(true);
  const [mediaPost, toggleMediaPost] = useToggle(false);
  const [linkPost, toggleLinkPost] = useToggle(false);
  const [postType, setPostType] = useState("textPost");

  // error handling
  const [error, setError] = useState(undefined);

  // functions
  const handlePostSection = e => {
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

  // inputs
  const [title, changeTitle] = useInputState("");
  const [body, changeBody] = useInputState("");
  const [link, changeLink] = useInputState("");

  const handleCommunityChange = e => {
    e.preventDefault();
    setCom(e.target.name);
    setIcon(e.target.href);
    toggleDropdown();
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newPost = { title };

    switch (postType) {
      case "textPost":
        newPost.body = body;
        break;
      // case "mediaPost":
      //   newPost[file] = file;
      //   break;
      case "linkPost":
        newPost.link = link;
        break;
      default:
        console.log("No post type selectd!");
    }

    console.log(newPost);
    // axios
    //   .post("api/posts/new", newPost)
    //   .then(post)
    //   .catch(err => setErrors(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts/communities/all")
      .then(coms => setCommunities(coms.data))
      .catch(e => setError(e.response.data));
  }, [setCommunities]);

  return (
    // HEADER & TITLE
    <div className="container column is-8 newPost">
      <p className="header3">Create Post</p>
      <hr style={{ marginBottom: "60px" }}></hr>
      <div className="columns levels">
        <div className="column" style={{ marginBottom: "10px" }}>
          <input
            className="input"
            type="text"
            placeholder="Write a nice title"
            onChange={changeTitle}
            value={title}
          ></input>
        </div>

        <strong>
          <p className="help is-danger is-centered">{error && error}</p>
        </strong>

        {/* COMMUNITITES DROPDOWN */}
        <div
          className={`dropdown ${dropdown && "is-active"}`}
          style={{ marginRight: "15px", marginTop: "11px" }}
        >
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={toggleDropdown}
            >
              <div style={{ marginTop: "5px" }}>
                {icon && (
                  <figure className="image is-48x48 comLogo">
                    <img
                      className="is-rounded"
                      src={icon}
                      alt="community logo"
                    ></img>
                  </figure>
                )}
              </div>
              <span style={{ width: "160px" }}>
                {com ? com : "Choose community"}
              </span>

              {/* <p className=" help is-danger">
              {com ? "" : "Community is required"}
            </p> */}
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <ul>
                {communities.map(com => (
                  <>
                    <a
                      href={com.img}
                      className="dropdown-item"
                      key={com._id}
                      name={com.name}
                      onClick={handleCommunityChange}
                    >
                      {com.name}
                    </a>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}

      <div className="tabs is-centered is-boxed" onClick={handlePostSection}>
        <ul>
          <li className={textPost && "is-active"}>
            <a name="textPost">
              <span className="icon is-small">
                <i className="fa fa-font" aria-hidden="true"></i>
              </span>
              Text
            </a>
          </li>

          <li className={mediaPost && "is-active"}>
            <a name="mediaPost">
              <i className="icon is-small fa fa-camera" aria-hidden="true"></i>
              Image/Video
            </a>
          </li>
          <li className={linkPost && "is-active"}>
            <a name="linkPost">
              <span className="icon is-small">
                <i className="fa fa-link" aria-hidden="true"></i>
              </span>
              Link
            </a>
          </li>
        </ul>
      </div>
      {/*  text field  */}
      <div style={{ display: textPost ? "block" : "none" }}>
        <textarea
          className="textarea"
          placeholder="Text"
          onChange={changeBody}
          value={body}
        ></textarea>
      </div>

      {/* media field */}
      <div style={{ display: mediaPost ? "block" : "none" }}>
        <div class="field">
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">Normal file…</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* link field */}
      <div style={{ display: linkPost ? "block" : "none" }}>
        <input
          className="textarea"
          placeholder="URL(required)"
          rows="10"
          onChange={changeLink}
          value={link}
        ></input>
      </div>

      {/* BUTTONS*/}
      <div style={{ marginTop: "20px" }}>
        <button
          className="button is-dark"
          style={{ marginRight: "10px" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button className="button is-light">Cancel</button>
      </div>
    </div>
  );
}

export default NewPost;
