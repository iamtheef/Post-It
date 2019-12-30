import React, { useContext } from "react";
import { PostContext } from "../Context/PostContext";
import CommunitySelector from "./CommunitiesSelector";
import TextEditor from "./TextEditor";
import FileManager from "./FileManager";

function NewPost() {
  const {
    handlePostSection,
    textPost,
    mediaPost,
    linkPost,
    handleSubmit,
    title,
    changeTitle,
    changeLink,
    link,
    errors
  } = useContext(PostContext);

  return (
    <>
      {/* HEADER & TITLE */}
      <div className="container column is-8 newPost">
        <p className="header3">Create Post</p>
        <hr style={{ marginBottom: "60px" }}></hr>
        <div className="columns" style={{ marginBottom: "10px" }}>
          <div className="column">
            <input
              className="input"
              type="text"
              placeholder="Write a nice title"
              onChange={changeTitle}
              value={title}
            ></input>
            <p className="help is-danger">{errors.title && errors.title}</p>
          </div>
          <div
            className="column"
            style={{ marginTop: "-15px", marginRight: "-50%" }}
          >
            <CommunitySelector />
          </div>
        </div>
        {/* TABS */}
        <div className="tabs is-centered is-boxed" onClick={handlePostSection}>
          <ul>
            <li className={`${textPost && "is-active"}`}>
              <a name="textPost" href="/">
                <span className="icon is-small">
                  <i className="fa fa-font" aria-hidden="true"></i>
                </span>
                Text
              </a>
            </li>

            <li className={`${mediaPost && "is-active"}`}>
              <a name="mediaPost" href="/">
                <i
                  className="icon is-small fa fa-camera"
                  aria-hidden="true"
                ></i>
                Image/Video
              </a>
            </li>
            <li className={`${linkPost && "is-active"}`}>
              <a name="linkPost" href="/">
                <span className="icon is-small">
                  <i className="fa fa-link" aria-hidden="true"></i>
                </span>
                Link
              </a>
            </li>
          </ul>
        </div>
        {/* Sections */}

        {/* 
        //
        //
        Text post*/}
        <div>
          <TextEditor />
          <p className="help is-danger">
            {errors.body && errors.body}
            {errors.length && errors.length}
          </p>
        </div>
        {/*
        //
        //
        Media post*/}
        <div style={{ display: mediaPost ? "block" : "none" }}>
          <FileManager />
        </div>

        {/* 
        //
        //
        
        Link post*/}
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
    </>
  );
}

export default NewPost;
