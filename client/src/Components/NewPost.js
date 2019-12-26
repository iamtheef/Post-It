import React, { useEffect, useState } from "react";
import useToggle from "../Hooks/useToggle";
import useInputState from "../Hooks/useInputState";
import axios from "axios";

function NewPost() {
  const [dropdown, toggleDropdown] = useToggle(false);
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState(undefined);
  const [com, setCom] = useState(undefined);
  const [icon, setIcon] = useState(undefined);

  const handleCommunityChange = e => {
    e.preventDefault();
    setCom(e.target.name);
    setIcon(e.target.href);
    toggleDropdown();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts/communities/all")
      .then(coms => setCommunities(coms.data))
      .catch(e => setError(e.response.data));
  }, [setCommunities]);

  return (
    <div className="container column is-8" style={{ marginTop: "60px" }}>
      <p className="header3">Create Post</p>
      <hr></hr>
      <div className=" columns ">
        <div className="column is-6 is-left">
          <input
            className="input"
            type="text"
            placeholder="Write a nice title"
          ></input>
        </div>

        <strong>
          <p className="help is-danger is-centered">{error && error}</p>
        </strong>

        <div className={`dropdown ${dropdown && "is-active"} column is-right`}>
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={toggleDropdown}
            >
              <span style={{ width: "170px" }}>
                {com ? com : "Choose community"}
                <div>
                  {icon && (
                    <figure className="image is-32x32">
                      <img
                        className="is-rounded"
                        src={icon}
                        alt="community logo"
                      ></img>
                    </figure>
                  )}
                </div>
              </span>

              {/* <p className=" help is-danger">
              {com ? "" : "Community is required"}
            </p> */}
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <ul>
                {communities.map(com => (
                  <>
                    <a
                      href={com.img}
                      className="dropdown-item"
                      key={com._id}
                      name={com.name}
                      onClick={handleCommunityChange}
                    >
                      {com.name}
                    </a>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <input
        className="textarea"
        placeholder="10 lines of textarea"
        rows="10"
      ></input>
      <button class="button is-dark">Submit</button>
      <button class="button is-light">Cancel</button>
    </div>
  );
}

export default NewPost;
