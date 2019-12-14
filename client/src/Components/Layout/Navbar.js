import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.stickpng.com%2Fassets%2Fimages%2F587389d8f3a71010b5e8ef4b.png&f=1&nofb=1" />
            <h1>postit</h1>
          </a>
        </div>

        <div id="navDrop" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-link">Sort By</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">Date</a>
              <a className="navbar-item">Hot</a>
              <a className="navbar-item">Popular</a>
            </div>
          </div>

          <input
            type="text"
            id="search"
            placeholder="Search for a post"
          ></input>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
