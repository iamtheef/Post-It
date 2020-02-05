import React, { useContext, useEffect, useState, memo } from "react";
import { PostContext } from "../Context/PostContext";

function Votings(props) {
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
    <div className="column is-1 sidebar-column is-vcentered">
      <div className="arrow-shadow" onClick={e => upvote(e, element._id)}>
        <i className={`arrow up arrow-up ${upvoted && cls}`}></i>
      </div>

      <div>
        {element.karma <= 1 ? (
          <i className={`postKarma ${cls}`}> • </i>
        ) : (
          <p className={`postKarma ${cls}`}>{element.karma}</p>
        )}
      </div>
      <div className="arrow-shadow" onClick={e => downvote(e, element._id)}>
        <i className={`arrow down arrow-down ${downvoted && cls}`}></i>
      </div>
    </div>
  );
}

export default memo(Votings);
