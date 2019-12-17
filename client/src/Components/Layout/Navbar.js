import React, { Component } from "react";
import { Link } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";

class Navbar extends Component {
  state = {
    visibleModal: false
  };

  toggleModal = e => {
    this.setState({ visibleModal: !this.state.visibleModal });
    let modal = document.getElementsByClassName("modal");
    window.onclick = function(e) {
      if (e.target == modal) {
        this.setState({ visibleModal: !this.state.visibleModal });
      }
    };
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
              <button className="button is-primary" onClick={this.toggleModal}>
                <strong>Sign up</strong>
              </button>
              <div
                className="modal"
                style={{ display: this.state.visibleModal ? "block" : "none" }}
              >
                <div className="modal-background"></div>
                <div className="modal-content has-background-white is-paddingless ">
                  <Register />
                </div>
              </div>
              <Link className="button is-light" to="/login">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
