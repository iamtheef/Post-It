import React, { useContext, useEffect, useState } from "react";
import ComAdder from "./ComAdder";
import Comment from "./Comment";
import { UserContext } from "../Context/UserContext";
import { PostContext } from "../Context/PostContext";

export default function Comments(props) {
  const { user } = useContext(UserContext);
  const { addComment, currentComments } = useContext(PostContext);

  const [comments, setComments] = useState();

  useEffect(() => {
    if (currentComments === undefined) {
      setComments(props.comments);
    } else {
      setComments(currentComments);
    }
    console.log(comments);
  }, [currentComments]);

  return (
    <div className="columns pr">
      <div className="column is-10">
        <div className="comment-as">
          {user && (
            <div>
              <p>Comment as {user.username}</p>
              {/* <ComAdder /> */}
            </div>
          )}
          <hr id="hr"></hr>
        </div>

        <hr></hr>
      </div>
      <ul>
        {comments &&
          comments.forEach(comment => (
            <li key={comment._id}>
              <h1>should be a comment</h1>
              <p>{comment.body}</p>
            </li>
          ))}
      </ul>
      <h1>you even printing bro?</h1>
    </div>
  );
}
