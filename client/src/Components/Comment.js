import React, { memo } from "react";
import Votings from "./Votings";
import ComFooter from "./ComFooter";

function Comment(props) {
  const { com } = props;
  const karma = [4, 41, 76, 8, "3,2k", "1,7k", 301, 507];

  return (
    <div className="columns comment">
      <Votings element={com} />
      <div className="column is-12">
        <article className="media">
          <div className="content">
            <strong>
              {com.username} · 3 hrs ·{" "}
              {com.karma
                ? com.karma
                : `${karma[Math.floor(Math.random() * karma.length)]} points`}
            </strong>
            <div dangerouslySetInnerHTML={{ __html: com.body }}></div>
          </div>
        </article>
        <ComFooter />
      </div>
    </div>
  );
}

export default memo(Comment);
