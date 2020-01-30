import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";

export default function Votings(props) {
  const { upvote, downvote } = useContext(PostContext);
  const { isUpvoted, isDownvoted } = useContext(UserContext);
  const { element } = props;
  const [isUV, setUV] = useState();
  const [isDV, setDV] = useState();

  const handleUpvote = e => {
    e.stopPropagation();
    e.preventDefault();
    if (isDV) setDV(!isDV);
    setUV(!isUV);
    upvote(element._id);
  };

  const handleDownvote = e => {
    e.stopPropagation();
    e.preventDefault();
    if (isUV) setUV(!isUV);
    setDV(!isDV);
    downvote(element._id);
  };

  useEffect(() => {
    setUV(isUpvoted(element._id));
    setDV(isDownvoted(element._id));
  }, [handleDownvote, handleUpvote]);

  return (
    <div className="column is-1 sidebar-column is-vcentered">
      <div className="arrow-shadow" onClick={e => handleUpvote(e)}>
        <i className={`arrow up arrow-up ${isUV && "upvoted"}`}></i>
      </div>

      <div>
        {element.karma <= 1 ? (
          <i className={`postKarma ${isUV && "upvoted"}`}> • </i>
        ) : (
          element.karma
        )}
      </div>
      <div className="arrow-shadow" onClick={e => handleDownvote(e)}>
        <i className={`arrow down arrow-down ${isDV && "downvoted"}`}></i>
      </div>
    </div>
  );
}
