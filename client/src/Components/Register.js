import React, { Component } from "react";
class Register extends Component {
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
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Your Email"
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

          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Confirm your password"
              ></input>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" /> I agree to the{" "}
                <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-dark">Submit</button>
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

export default Register;
