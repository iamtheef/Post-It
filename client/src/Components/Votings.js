import React, { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";

export default function Votings(element) {
  const { upvote } = useContext(PostContext);
  const [isUV, setUV] = useState(element.upvoted);
  const [isDV, setDV] = useState(element.downvoted);

  const handleUpvote = e => {
    if (isDV) setDV(!isDV);
    setUV(!isUV);
    upvote(e, element._id);
  };

  const handleDownvote = e => {
    if (isUV) setUV(!isUV);
    setDV(!isDV);
    upvote(e, element._id);
  };

  return (
    <div className="column is-1 sidebar-column is-vcentered">
      <div className="arrow-shadow" onClick={handleUpvote}>
        <i className={`arrow up arrow-up ${isUV && "upvoted"}`}></i>
      </div>

      <div id={` ${isUV && "upvoted"}`}>
        {element.karma <= 1 ? <i className="postKarma"> • </i> : element.karma}
      </div>
      <div className="arrow-shadow" onClick={handleDownvote}>
        <i className={`arrow down arrow-down ${isDV && "downvoted"}`}></i>
      </div>
    </div>
  );
}
