import React, { Component } from "react";
class Login extends Component {
  //   state = {
  //     username,
  //     password
  //   };

  //   onChange = e => {
  //     setState;
  //   };

  render() {
    return (
      <div
        className="container columns is-centered"
        style={{ marginTop: "80px" }}
      >
        <div className="column is-half">
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Your username"
              ></input>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Create a strong password"
              ></input>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-dark">Login</button>
            </div>
            <div className="control">
              <button className="button is-light">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
