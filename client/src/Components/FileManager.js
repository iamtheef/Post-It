import React, { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";

export default function FileManager() {
  const { setFile } = useContext(PostContext);
  const [filename, setFilename] = useState("Choose File");

  const handleChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <div className="field">
      <div className="file">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            name="image"
            onChange={handleChange}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">{filename}</span>
          </span>
        </label>
      </div>
      <p className="help is-danger is-centered"></p>
    </div>
  );
}
