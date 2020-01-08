import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PostCard1 from "./PostCard1";

export default function Landing() {
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/posts/all")
      .then(res => setPosts(res.data))
      .catch(e => setError(e));
  }, [setPosts]);

  return (
    <div>
      <div className="container columns is-centered">
        <p className="help is-danger">{error && error}</p>

        <div className="column is-6 ">
          <Link to="/newpost">
            <input
              className="input"
              type="text"
              placeholder="Make a new post"
              style={{ marginTop: "80px" }}
            ></input>
          </Link>

          <ul>
            {posts.map(post => (
              <li key={post._id}>
                <PostCard1 post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
