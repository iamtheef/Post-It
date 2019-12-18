import React, { Component } from "react";
import { Link } from "react-router-dom";

import Login from "../Login";
import Register from "../Register";

class Navbar extends Component {
  state = {
    visibleModal: false,
    visibleModal2: false
  };

  toggleModal = e => {
    this.setState({ visibleModal: !this.state.visibleModal });
  };

  toggleModal2 = e => {
    this.setState({ visibleModal2: !this.state.visibleModal2 });
  };

  render() {
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

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                className="button"
                style={{
                  backgroundColor: "hsla(38, 93%, 68%, 0.694)"
                }}
                onClick={this.toggleModal}
              >
                <strong>Sign up</strong>
              </button>
              <div
                className="modal"
                style={{
                  display: this.state.visibleModal ? "block" : "none",
                  overflow: "auto"
                }}
              >
                <div className="modal-background"></div>
                <div className="modal-content has-background-white is-centered">
                  <Register />
                </div>
              </div>

              <button
                className="button is-light"
                style={{ border: " 1px solid black" }}
                onClick={this.toggleModal2}
              >
                <strong>Login</strong>
              </button>
              <div
                className="modal"
                style={{
                  display: this.state.visibleModal2 ? "block" : "none",
                  overflow: "auto"
                }}
              >
                <div className="modal-background"></div>
                <div className="modal-content has-background-white is-centered">
                  <Login />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
