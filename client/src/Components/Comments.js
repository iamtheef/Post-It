import React, { useContext, useEffect, useState } from "react";
import ComAdder from "./ComAdder";
import Comment from "./Comment";
import { UserContext } from "../Context/UserContext";
import { PostContext } from "../Context/PostContext";

export default function Comments(props) {
  const { user } = useContext(UserContext);
  const { currentComments } = useContext(PostContext);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (currentComments === undefined) {
      setComments(props.comments);
    } else {
      setComments(currentComments);
    }
  }, [currentComments, props.comments]);

  return (
    <div className="columns pr">
      <div className="column is-10">
        <div className="comment-as">
          {user && (
            <div>
              <p>Comment as {user.username}</p>
              <ComAdder />
            </div>
          )}
          <hr id="hr"></hr>
        </div>

        <hr></hr>
        <ul>
          {comments &&
            comments.map(com => (
              <li key={com._id}>
                <Comment com={com} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
