import React, { useContext, memo } from "react";
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
          <div className="column is-9">
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
            className="column is-3"
            style={{ marginTop: "-15px", marginRight: "-20vw" }}
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
        <div style={{ display: textPost ? "block" : "none" }}>
          <TextEditor />
          <ul style={{ marginTop: "50px" }}>
            <li>
              <p className="help is-danger">{errors.body && errors.body}</p>
            </li>
            <li>
              <p className="help is-danger">{errors.length && errors.length}</p>
            </li>
          </ul>
        </div>
        {/*
        //
        //
        Media post*/}
        <div style={{ display: mediaPost ? "block" : "none" }}>
          <FileManager />
          <p className="help is-danger">{errors.file && errors.file}</p>
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
          <ul>
            <li>
              <p className="help is-danger">{errors.link && errors.link}</p>
            </li>
            <li>
              <p className="help is-danger">
                {errors.validLink && errors.validLink}
              </p>
            </li>
          </ul>
        </div>

        {/* BUTTONS*/}
        <div style={{ marginTop: "60px" }}>
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

export default memo(NewPost);
