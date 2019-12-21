import React, { Component } from "react";
import { login, errors } from "../Context/UserContext";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    login(user);
    this.setState({ errors: res.errors });
  };

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="container columns is-centered">
          <div className="column is-one-quarter">
            <img
              style={{
                minWidth: "780px",
                opacity: "0.3",
                minHeight: "850px"
              }}
              src="https://media.giphy.com/media/50OAJNulFBBrq/source.gif"
              alt="robot gif"
            />
          </div>
          <div
            className="column is-three-quarters is-centered"
            style={{
              marginTop: "10%",
              marginRight: "200px"
            }}
          >
            <h1 id="header">
              Login to your account on <span id="middle-header">postit</span>
            </h1>
            <div className="field">
              <label className="label">Email *</label>
              <div className="control">
                <input
                  className={`input ${errors.email ? "is-danger" : ""}`}
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                ></input>
                <p className="help is-danger">
                  {errors.email ? errors.email : ""}
                </p>
              </div>
            </div>

            <div className="field">
              <label className="label">Password *</label>
              <div className="control">
                <input
                  className={`input ${errors.password && "is-danger"}`}
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                ></input>
                <p className="help is-danger">
                  {errors.password ? errors.password : ""}
                </p>
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
            <div className="login-prompts label">
              <a href="/" style={{ marginRight: "4px" }}>
                Forgot your username? ·
              </a>
              <a href="/">Forgot your password?</a>
              <p style={{ marginTop: "20px" }}>
                New here? <a href="/">Create your account</a>
              </p>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
