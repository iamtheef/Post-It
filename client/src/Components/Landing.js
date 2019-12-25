import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="container columns is-centered">
          <div className="column is-6 ">
            <input
              className="input"
              type="text"
              placeholder="Make a new post"
              style={{ marginTop: "80px" }}
            ></input>
          </div>
        </div>

        <div className="dropdown is-active is-right">
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>Dropdown button</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a href="#" className="dropdown-item">
                Dropdown item
              </a>
              <a className="dropdown-item">Other dropdown item</a>
              <a href="#" className="dropdown-item is-active">
                Active dropdown item
              </a>
              <a href="#" className="dropdown-item">
                Other dropdown item
              </a>

              <a href="#" className="dropdown-item">
                With a divider
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
