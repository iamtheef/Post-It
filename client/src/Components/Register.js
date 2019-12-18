import React, { Component } from "react";
import axios from "axios";
import onClickOutside from "react-onclickoutside";

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

  // handleClickOutside = () => {
  //   this.style.display = "none";
  // };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(e => this.setState({ errors: e.response.data }));
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
              src="https://media.giphy.com/media/l4FGGAlWYVMUciiJy/giphy.gif"
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
              Create your account on <span id="middle-header">postit</span> to
              create posts and comment
            </h1>
            <div className="field">
              <label className="label">Username *</label>
              <div className="control">
                <input
                  className={`input ${errors.username ? "is-danger" : ""}`}
                  type="text"
                  placeholder="Your username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                ></input>
                <p className="help is-danger">
                  {errors.username ? errors.username : ""}
                </p>
              </div>
            </div>

            <div className="field">
              <label className="label">Email *</label>
              <div className="control">
                <input
                  className={`input ${errors.email && "is-danger"}`}
                  type="text"
                  placeholder="Your email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                ></input>
                <p className="help is-danger">{errors.email && errors.email}</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Password *</label>
              <div className="control">
                <input
                  className={`input ${errors.password && "is-danger"}`}
                  type="password"
                  placeholder="Create a strong password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                ></input>
                <p className="help is-danger">
                  {errors.password ? errors.password : ""}
                </p>
              </div>
            </div>

            <div className="field">
              <label className="label">Confirm Password *</label>
              <div className="control">
                <input
                  className={`input ${errors.password2 && "is-danger"}`}
                  type="password"
                  placeholder="Confirm your password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                ></input>
                <p className="help is-danger">
                  {errors.password2 && errors.password2}
                </p>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input type="checkbox" required /> We love robots,{" "}
                  <a href="/">but we need to confirm you are not one. :]</a>
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

export default onClickOutside(Register);
