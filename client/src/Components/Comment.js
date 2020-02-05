import React from "react";
import Votings from "./Votings";
import ComFooter from "./ComFooter";

export default function Comment(props) {
  const { com } = props;

  return (
    <div className="columns comment">
      <Votings element={com} />
      <div className="column is-12">
        <article className="media">
          <div className="content">
            <strong>
              {com.username} · 3 hrs · {com.karma ? com.karma : "12 points"}
            </strong>
            <div dangerouslySetInnerHTML={{ __html: com.body }}></div>
          </div>
        </article>
        <ComFooter />
      </div>
    </div>
  );
}
