import React, { useContext } from "react";
import { PostContext } from "../Context/PostContext";

export default function FileManager() {
  //   const { file, setFile } = useContext(PostContext);

  //   const handleUpload = e => {
  //     e.preventDefault();
  //     new FormData();
  //     setFile;
  //   };

  return (
    <div className="field">
      <div className="file">
        <label className="file-label">
          <form>
            <input className="file-input" type="file" name="resume" />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Normal file…</span>
            </span>
          </form>
        </label>
      </div>
    </div>
  );
}
