import React, { useContext } from "react";
import TextEditor from "./TextEditor";
import { UserContext } from "../Context/UserContext";

export default function Comments(props) {
  const { comments } = props;
  const { user } = useContext(UserContext);

  return (
    <div className="columns">
      <div className="column is-7">
        <div className="comment-as">
          {user && (
            <div>
              <p>Comment as {user.username}</p>
              <TextEditor />
            </div>
          )}
          <hr id="hr"></hr>
          <ul>
            {comments.forEach(comment => (
              <li key={comment._id}>
                <div dangerouslySetInnerHTML={{ __html: comment }}></div>
              </li>
            ))}
          </ul>
        </div>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
      </div>
    </div>
  );
}
