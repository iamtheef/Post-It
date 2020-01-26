import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useToggle from "../../Hooks/useToggle";
import Login from "../Login";
import Register from "../Register";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const [regModal, toggleRegModal] = useToggle(false);
  const [logModal, toggleLogModal] = useToggle(false);

  // handling esc key (closes modals if any open)
  document.onkeydown = e => {
    if (e.keyCode === 27) {
      if (logModal) toggleLogModal();
      if (regModal) toggleRegModal();
    }
  };

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
        <img
          src="https://media.giphy.com/media/QTfXEhq05P5snynFt5/giphy.gif"
          alt="logo"
        ></img>
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
                <div
                  className="modal-content has-background-white is-centered"
                  onClick={errors => {
                    if (!errors && regModal) toggleRegModal();
                  }}
                >
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
                  <Login
                    onClick={errors => {
                      if (!errors && logModal) toggleLogModal();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-item has-dropdown is-hoverable">
          <Link className="navbar-link" to="#">
            <img
              alt="user logo"
              className="user-avatar"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstyles.redditmedia.com%2Ft5_ag5gy%2Fstyles%2FprofileIcon_kveeu0ih46901.png%3Fwidth%3D256%26height%3D256%26crop%3D256%3A256%2Csmart%26s%3Dd68b7fef8cd1bf7d4d6e6c06c57bc80083909665&f=1&nofb=1"
            ></img>
            {user.username}
          </Link>

          <div className="navbar-dropdown">
            <Link className="navbar-item" to="/profile">
              Profile
            </Link>
            <Link className="navbar-item" to="/">
              Settings
            </Link>
            <Link onClick={logout} className="navbar-item" to="/">
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
