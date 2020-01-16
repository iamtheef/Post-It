import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Post(props) {
  const postId = props.match.params.id;
  const [post, setPost] = useState();

  useEffect(() => {
    axios
      .get(`/api/posts/${postId}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(e => console.log(e));
  }, [setPost]);

  return (
    // <div>
    //   <div className="postCard1-header column is-10">
    //     <strong>
    //       <span
    //         style={{
    //           color: "#3f3d3e"
    //         }}
    //       >
    //         <span className="underline">
    //           <Link to={`/communities/${post.community._id}`}>
    //             p/{post.community.name}
    //           </Link>
    //         </span>
    //       </span>
    //     </strong>
    //     {" • "}
    //     Posted by{" "}
    //     <Link to={`/profile/${post.user._id}`}>
    //       <span className="underline">{post.user.username}</span>
    //     </Link>{" "}
    //     {moment(post.date).fromNow()}
    //   </div>

    <div>
      {post.type === "textPost" && (
        <div className="columns">
          <h1 style={{ marginTop: "200px" }} className="column is-12">
            {post.title}
          </h1>
          <div
            className="column is-12"
            dangerouslySetInnerHTML={{ __html: post.body }}
          ></div>
        </div>
      )}
    </div>
  );
}
