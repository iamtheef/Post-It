import React, { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";

export default function FileManager() {
  const { setFile, errors } = useContext(PostContext);
  const [filename, setFilename] = useState("Choose File");

  const handleChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <div className="field">
      <div className="file">
        <label className="file-label">
          <form>
            <input
              className="file-input"
              type="file"
              name="resume"
              onChange={handleChange}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">{filename}</span>
            </span>
          </form>
        </label>
      </div>
      <p className="help is-danger is-centered">{errors.file && errors.file}</p>
    </div>
  );
}
