import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";

export default function Votings(props) {
  const { currentPost, upvote, downvote } = useContext(PostContext);
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
    setUV(isUpvoted(currentPost._id));
    setDV(isDownvoted(currentPost._id));
  }, [handleDownvote, handleUpvote]);

  return (
    <div className="modal-votings">
      <div className="columns">
        <div className="modal-vote-arrows">
          <div className="arrow-shadow" onClick={e => handleUpvote(e)}>
            <i className={`arrow up arrow-up ${isUV && "upvoted"}`}></i>
          </div>
        </div>

        <div className="arrow-spacing">
          <div>
            {element.karma <= 1 ? (
              <i className={`postKarma ${isUV && "upvoted"}`}> • </i>
            ) : (
              <p
                style={{ marginTop: "3px" }}
                className={`postKarma ${isUV && "upvoted"} ${isDV &&
                  "downvoted"}`}
              >
                {element.karma}
              </p>
            )}
          </div>
        </div>

        <div className="arrow-spacing">
          <div className="arrow-shadow" onClick={e => handleDownvote(e)}>
            <i className={`arrow down arrow-down ${isDV && "downvoted"}`}></i>
          </div>
        </div>
        <div className="vertical-divider" style={{ marginLeft: "2vw" }}></div>
        <p className="arrow-spacing modal-uptitle">{element.title}</p>
      </div>
    </div>
  );
}
