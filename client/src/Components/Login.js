import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import useInputState from "../Hooks/useInputState";

function Login() {
  const { login, error } = useContext(UserContext);
  const [emailValue, handleEmailChange, resetEmail] = useInputState("");
  const [passValue, handlePassChange, resetPass] = useInputState("");
  const handleSubmit = e => {
    e.preventDefault();
    let user = {
      email: emailValue,
      password: passValue
    };
    login(user);
    resetEmail();
    resetPass();
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

          <h1 className="help is-danger" style={{ fontSize: "15px" }}>
            {error && error.msg}
          </h1>

          <div className="field">
            <label className="label">Email *</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter your email"
                name="email"
                value={emailValue}
                onChange={handleEmailChange}
              ></input>
            </div>
          </div>

          <div className="field">
            <label className="label">Password *</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={passValue}
                onChange={handlePassChange}
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

export default Login;
