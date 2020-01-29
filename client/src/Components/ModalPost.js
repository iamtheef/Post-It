import React from "react";
import ModalVotings from "./ModalVotings";
import Post from "./Post";
import PostFooter from "./PostFooter";
import Comments from "./Comments";
import CommunityFooter from "./CommunityFooter";
import Footer from "./Footer";
import RulesFooter from "./RulesFooter";

export default function ModalPost(props) {
  const { post, upvoted, downvoted } = props;

  return (
    <div>
      <div
        className="columns is-parent tile notification"
        style={{ marginTop: "40px" }}
      >
        <div className="column is-12">
          <ModalVotings
            className="modal-votings"
            element={post}
            upvoted={upvoted}
            downvoted={downvoted}
          />
          <Post post={post} />
          <PostFooter post={post} />
          <div className="content columns">
            <Comments comments={post.comments} />
            <div className="column is-4 modalfooter">
              <CommunityFooter post={post} />
            </div>
            <div className="column is-4 modalfooter">
              <RulesFooter post={post} />
            </div>
            <div className="column is-4 modalfooter">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
