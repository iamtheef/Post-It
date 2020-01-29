import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";

export default function Votings(props) {
  const { upvote, downvote } = useContext(PostContext);
  const { element } = props;
  const [isUV, setUV] = useState(props.upvoted);
  const [isDV, setDV] = useState(props.downvoted);
  const { isUpvoted, isDownvoted } = useContext(UserContext);
  const { currentPost } = useContext(PostContext);

  useEffect(() => {
    setUV(isUpvoted(currentPost._id));
    setDV(isDownvoted(currentPost._id));
  }, [currentPost]);

  const handleUpvote = e => {
    if (isDV) setDV(!isDV);
    setUV(!isUV);
    upvote(e, element._id);
  };

  const handleDownvote = e => {
    if (isUV) setUV(!isUV);
    setDV(!isDV);
    downvote(e, element._id);
  };

  return (
    <div className="modal-votings">
      <div className="columns">
        <div className="modal-vote-arrows">
          <div className="arrow-shadow" onClick={handleUpvote}>
            <i className={`arrow up arrow-up ${isUV && "upvoted"}`}></i>
          </div>
        </div>

        <div className="arrow-spacing">
          <div>
            {element.karma <= 1 ? (
              <i className={`postKarma ${isUV && "upvoted"}`}> • </i>
            ) : (
              element.karma
            )}
          </div>
        </div>

        <div className="arrow-spacing">
          <div className="arrow-shadow" onClick={handleDownvote}>
            <i className={`arrow down arrow-down ${isDV && "downvoted"}`}></i>
          </div>
        </div>
        <div className="vertical-divider" style={{ marginLeft: "2vw" }}></div>
        <p className="arrow-spacing modal-uptitle">{element.title}</p>
      </div>
    </div>
  );
}
