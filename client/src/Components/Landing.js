import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="container columns is-centered">
          <div className="column is-6 ">
            <Link to="/newpost">
              <input
                className="input"
                type="text"
                placeholder="Make a new post"
                style={{ marginTop: "80px" }}
              ></input>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
