import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useToggle from "../../Hooks/useToggle";
import Login from "../Login";
import Register from "../Register";
import { UserContext } from "../../Context/UserContext";

function Navbar() {
  const { user } = useContext(UserContext);
  const [regModal, toggleRegModal] = useToggle(false);
  const [logModal, toggleLogModal] = useToggle(false);

  return (
    <nav
      className="navbar is-light is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <Link to="/" className="navbar-brand navbar-item">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.stickpng.com%2Fassets%2Fimages%2F587389d8f3a71010b5e8ef4b.png&f=1&nofb=1"
          alt="logo"
        />
        <h1>postit</h1>
      </Link>

      <div className="navbar-item has-dropdown is-hoverable">
        <Link className="navbar-link" to="/">
          Sort By
        </Link>

        <div className="navbar-dropdown">
          <a href="/" className="navbar-item">
            Hot
          </a>
          <a href="/" className="navbar-item">
            Lastest
          </a>
          <a href="/" className="navbar-item">
            Popular
          </a>
        </div>
      </div>

      <input type="text" id="search" placeholder="Search for a post"></input>

      {!user ? (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button register" onClick={toggleRegModal}>
                Sign up
              </button>
              <div
                className="modal"
                style={{ display: regModal ? "block" : "none" }}
              >
                <div
                  className="modal-background"
                  onClick={toggleRegModal}
                ></div>
                <div className="modal-content has-background-white is-centered">
                  <Register />
                </div>
              </div>

              <button
                className="button is-light login"
                onClick={toggleLogModal}
              >
                Login
              </button>
              <div
                className="modal"
                style={{ display: logModal ? "block" : "none" }}
              >
                <div
                  className="modal-background"
                  onClick={toggleLogModal}
                ></div>
                <div className="modal-content has-background-white is-centered">
                  <Login />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Profile</h1>
      )}
    </nav>
  );
}

export default Navbar;
