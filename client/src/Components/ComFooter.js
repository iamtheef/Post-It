import React from "react";

export default function ComFooter() {
  return (
    <div className="postInfo columns">
      <div className="postInfoChild column is-2">
        <p className="infoTitle">
          <i className="fa fa-comment" aria-hidden="true"></i>
          Reply
        </p>
      </div>
      <div className="postInfoChild column is-3">
        <p className="infoTitle">
          <i className="fa fa-trophy" aria-hidden="true"></i> Give Award
        </p>
      </div>

      <div className="postInfoChild column is-2">
        <p className="infoTitle">
          <i className="fa fa-bookmark" aria-hidden="true"></i> Save
        </p>
      </div>
      <div className="postInfoChild column is-2">
        <p className="infoTitle" id="share-icon">
          <i className="fa fa-share" aria-hidden="true"></i> Share
        </p>
      </div>
    </div>
  );
}
