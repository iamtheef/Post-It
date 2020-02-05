import React, { useContext } from "react";
import { PostContext } from "../Context/PostContext";
import { UserContext } from "../Context/UserContext";

export default function Votings(props) {
  const { upvote, downvote } = useContext(PostContext);
  const { isUpvoted, isDownvoted } = useContext(UserContext);
  const { element } = props;

  return (
    <div className="modal-votings">
      <div className="columns">
        <div className="modal-vote-arrows">
          <div className="arrow-shadow" onClick={e => upvote(e, element._id)}>
            <i
              className={`arrow up arrow-up ${isUpvoted(element._id) &&
                "upvoted"}`}
            ></i>
          </div>
        </div>

        <div className="arrow-spacing">
          <div>
            {element.karma <= 1 ? (
              <i
                className={`postKarma ${(isUpvoted(element._id) && "upvoted") ||
                  (isDownvoted(element._id) && "downvoted")}`}
              >
                {" "}
                •{" "}
              </i>
            ) : (
              <p
                style={{ marginTop: "3px" }}
                className={`postKarma ${(isUpvoted(element._id) && "upvoted") ||
                  (isDownvoted(element._id) && "downvoted")}`}
              >
                {element.karma}
              </p>
            )}
          </div>
        </div>

        <div className="arrow-spacing">
          <div className="arrow-shadow" onClick={e => downvote(e, element._id)}>
            <i
              className={`arrow down arrow-down ${isDownvoted(element._id) &&
                "downvoted"}`}
            ></i>
          </div>
        </div>
        <div className="vertical-divider" style={{ marginLeft: "2vw" }}></div>
        <p className="arrow-spacing modal-uptitle">{element.title}</p>
      </div>
    </div>
  );
}
