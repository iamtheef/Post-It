import React, { Component } from "react";
class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
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
              Create your account on <span id="middle-header">postit</span> to
              create posts and comment
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
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Your Email"
                  name="email"
                  value={this.state.email}
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
                  placeholder="Create a strong password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                ></input>
              </div>
            </div>

            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm your password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                ></input>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input type="checkbox" required /> I agree to the{" "}
                  <a href="/">terms and conditions</a>
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
      </form>
    );
  }
}

export default Register;
