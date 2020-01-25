import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function PostHeader(props) {
  const { post } = props;

  return (
    <div className="columns">
      <div className="column is-1">
        <figure className="image">
          <img
            className="is-rounded community-icon-landing"
            src={post.community.img}
            alt="community logo"
          ></img>
        </figure>
      </div>

      <div className="postCard1-header column is-10">
        <strong>
          <span
            style={{
              color: "#3f3d3e"
            }}
          >
            <span className="underline">
              <Link to={`/communities/${post.community._id}`}>
                p/{post.community.name}
              </Link>
            </span>
          </span>
        </strong>
        {" • "}
        Posted by{" "}
        <Link to={`/profile/${post.user}`}>
          <span className="underline">{post.user.username}</span>
        </Link>{" "}
        {moment(post.date).fromNow()}
      </div>
    </div>
  );
}
