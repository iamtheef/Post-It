import React, { Component } from "react";
class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
    visibleModal: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div
          className="container columns is-centered"
          style={{ marginTop: "80px" }}
        >
          <div className="column is-half">
            <h1 id="header">
              Sing in to your <span id="middle-header">postit</span> account
            </h1>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Your username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                ></input>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Your password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
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
      </form>
    );
  }
}

export default Login;
