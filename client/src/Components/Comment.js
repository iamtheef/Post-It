import React from "react";
import Votings from "./Votings";

export default function Comment(props) {
  const { com } = props;
  console.log(props.com);
  return (
    <div className="columns">
      <Votings post={com} />
      <div className="column is-12">
        <article className="media">
          <div className="content">
            <p>
              <strong>
                Barbara Middleton · 3 hrs ·{" "}
                {com.karma ? com.karma : "12 points"}
              </strong>
              <div dangerouslySetInnerHTML={{ __html: com.body }}></div>
              <small>
                <a>Reply</a>
              </small>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
