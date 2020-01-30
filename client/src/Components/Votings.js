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
    upvote(element._id);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDownvote = e => {
    downvote(element._id);
    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    setUV(isUpvoted(element._id));
    setDV(isDownvoted(element._id));
  }, [handleUpvote, handleDownvote]);

  return (
    <div className="column is-1 sidebar-column is-vcentered">
      <div className="arrow-shadow" onClick={e => handleUpvote(e)}>
        <i className={`arrow up arrow-up ${isUV && "upvoted"}`}></i>
      </div>

      <div>
        {element.karma <= 1 ? (
          <i className={`postKarma ${isUV && "upvoted"}`}> • </i>
        ) : (
          <p
            className={`postKarma ${isUV && "upvoted"} ${isDV && "downvoted"}`}
          >
            {element.karma}
          </p>
        )}
      </div>
      <div className="arrow-shadow" onClick={e => handleDownvote(e)}>
        <i className={`arrow down arrow-down ${isDV && "downvoted"}`}></i>
      </div>
    </div>
  );
}
