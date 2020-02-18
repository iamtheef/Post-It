import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import useInputState from "../../Hooks/useInputState";

function Register() {
  const { register, errors } = useContext(UserContext);
  const [usernameValue, handleUsernameChange] = useInputState("");
  const [emailValue, handleEmailChange] = useInputState("");
  const [passValue, handlePassChange, resetPass] = useInputState("");
  const [pass2Value, handlePass2Change, resetPass2] = useInputState("");
  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: usernameValue,
      email: emailValue,
      password: passValue,
      password2: pass2Value
    };
    register(newUser);
    resetPass();
    resetPass2();
  };

  return (
    <form onSubmit={handleSubmit}>
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
                className={`input ${errors.username && "is-danger"}`}
                type="text"
                placeholder="Your username"
                name="username"
                value={usernameValue}
                onChange={handleUsernameChange}
              ></input>
              <p className="help is-danger">
                {errors.username && errors.username}
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
                value={emailValue}
                onChange={handleEmailChange}
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
                value={passValue}
                onChange={handlePassChange}
              ></input>
              <p className="help is-danger">
                {errors.password && errors.password}
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
                value={pass2Value}
                onChange={handlePass2Change}
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

export default Register;
