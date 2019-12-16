import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar is-light is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <Link to="/" className="navbar-brand navbar-item">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.stickpng.com%2Fassets%2Fimages%2F587389d8f3a71010b5e8ef4b.png&f=1&nofb=1"
          alt="noPicFound"
        />
        <h1>postit</h1>
      </Link>

      <div className="navbar-item has-dropdown is-hoverable">
        <Link className="navbar-link" to="/">
          Sort By
        </Link>

        <div className="navbar-dropdown">
          <a className="navbar-item">Hot</a>
          <a className="navbar-item">Lastest</a>
          <a className="navbar-item">Popular</a>
        </div>
      </div>

      <input type="text" id="search" placeholder="Search for a post"></input>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-primary" to="/register">
              <strong>Sign up</strong>
            </Link>
            <Link className="button is-light" to="/login">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
