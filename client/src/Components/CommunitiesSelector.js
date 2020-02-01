import React, { useEffect, useState, useContext } from "react";
import useToggle from "../Hooks/useToggle";
import axios from "axios";
import { PostContext } from "../Context/PostContext";

function CommunitySelector() {
  // communities hooks
  const [dropdown, toggleDropdown] = useToggle(false);
  const [communities, setCommunities] = useState([]);
  const [name, setName] = useState(undefined);
  const [icon, setIcon] = useState(undefined);
  const { setCommunity, errors } = useContext(PostContext);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts/communities/all")
      .then(coms => setCommunities(coms.data))
      .catch(e => setError(e.response.data));
  }, [setCommunities]);

  const handleCommunityChange = (e, name, id) => {
    setName(name);
    e.preventDefault();
    setCommunity(id);
    setIcon(e.target.href);
    toggleDropdown();
  };

  return (
    <>
      <strong>
        <p className="help is-danger is-centered">{error && error}</p>
      </strong>
      <div
        className={`dropdown ${dropdown && "is-active"}`}
        style={{ marginRight: "15px", marginTop: "11px" }}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={toggleDropdown}
          >
            <div style={{ marginTop: "5px" }}>
              {icon && (
                <figure className="image comLogo">
                  <img
                    className="is-rounded"
                    src={icon}
                    alt="community logo"
                  ></img>
                </figure>
              )}
            </div>

            <span style={{ width: "140px" }}>
              {name ? name : "Choose community"}
            </span>

            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>

        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {communities.map(com => (
              <ul key={com._id}>
                <a
                  href={com.img}
                  className="dropdown-item"
                  name={com.name}
                  onClick={e => handleCommunityChange(e, com.name, com._id)}
                >
                  {com.name}
                </a>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <p className="help is-danger">{errors.community && errors.community}</p>
    </>
  );
}

export default CommunitySelector;
