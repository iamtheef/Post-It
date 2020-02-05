import React, { useContext, useEffect, useState, memo } from "react";
import { PostContext } from "../Context/PostContext";

function ModalVotings(props) {
  const { upvote, downvote, getVotingStatus } = useContext(PostContext);
  const { element } = props;
  const [votingStatus, setVotingStatus] = useState(
    getVotingStatus(element._id)
  );

  const { upvoted, downvoted, cls } = votingStatus;
  useEffect(() => {
    setVotingStatus(getVotingStatus(element._id));
  }, [upvote, downvote]);

  return (
    <div className="modal-votings">
      <div className="columns">
        <div className="modal-vote-arrows">
          <div className="arrow-shadow" onClick={e => upvote(e, element._id)}>
            <i className={`arrow up arrow-up ${upvoted && cls}`}></i>
          </div>
        </div>

        <div className="arrow-spacing">
          <div>
            {element.karma <= 1 ? (
              <i className={`postKarma ${cls}`}> • </i>
            ) : (
              <p style={{ marginTop: "3px" }} className={`postKarma ${cls}`}>
                {element.karma}
              </p>
            )}
          </div>
        </div>

        <div className="arrow-spacing">
          <div className="arrow-shadow" onClick={e => downvote(e, element._id)}>
            <i className={`arrow down arrow-down ${downvoted && cls}`}></i>
          </div>
        </div>
        <div className="vertical-divider" style={{ marginLeft: "2vw" }}></div>
        <p className="arrow-spacing modal-uptitle">{element.title}</p>
      </div>
    </div>
  );
}

export default memo(ModalVotings);
