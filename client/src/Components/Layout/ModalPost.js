import React, { useState, useEffect, useContext } from "react";
import ModalVotings from "../ModalVotings";
import Post from "../Post";
import PostFooter from "../PostFooter";
import Comments from "./Comments";
import CommunityFooter from "./CommunityFooter";
import Footer from "./Footer";
import RulesFooter from "./RulesFooter";
import { PostContext } from "../../Context/PostContext";
import { UserContext } from "../../Context/UserContext";

export default function ModalPost() {
  const { isUpvoted, isDownvoted } = useContext(UserContext);
  const [upvoted, setUpvoted] = useState();
  const [downvoted, setDownvoted] = useState();
  const { currentPost } = useContext(PostContext);

  useEffect(() => {
    setUpvoted(isUpvoted(currentPost._id));
    setDownvoted(isDownvoted(currentPost._id));
  }, [currentPost]);

  return (
    <div>
      <div
        className="columns is-parent tile notification"
        style={{ marginTop: "40px" }}
      >
        <div className="column is-12">
          <ModalVotings className="modal-votings" element={currentPost} />
          <Post post={currentPost} upvoted={upvoted} downvoted={downvoted} />
          <PostFooter post={currentPost} />
          <div className="columns">
            <div className="column is-8">
              <Comments comments={currentPost.comments} />
            </div>
            <div className="column is-4">
              <div className="modalfooter">
                <CommunityFooter post={currentPost} />
              </div>
              <div className="modalfooter">
                <RulesFooter post={currentPost} />
              </div>
              <div className="modalfooter">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
