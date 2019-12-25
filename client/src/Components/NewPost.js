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
    setIcon(e.target.src);
    console.log(e.target.class);
    toggleDropdown();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts/communities/all")
      .then(coms => setCommunities(coms.data))
      .catch(e => setError(e.response.data));
  }, [setCommunities]);

  return (
    <div>
      <div className="container columns is-centered">
        <div className="column is-6 ">
          <input
            className="input"
            type="text"
            placeholder="Write a nice title"
            style={{ marginTop: "80px" }}
          ></input>
        </div>
      </div>
      <strong>
        <p className="help is-danger is-centered">{error && error}</p>
      </strong>
      <div
        className={`dropdown ${dropdown && "is-active"}`}
        style={{ marginLeft: "1100px", marginTop: "-65px" }}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={toggleDropdown}
          >
            <span style={{ width: "170px" }}>
              {com ? com : "Choose community"}
              {icon && (
                <figure className="image is-32x32">
                  <img
                    className="is-rounded is-left"
                    src={icon}
                    alt="community logo"
                  ></img>
                </figure>
              )}
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
                    style={{ marginLeft: "50px" }}
                    href="/"
                    className="dropdown-item is-right"
                    key={com._id}
                    name={com.name}
                    src={com.img}
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
  );
}

export default NewPost;
