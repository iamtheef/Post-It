import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import setAuthToken from "../AxiosRequestAuthUtil";
import jwt_decode from "jwt-decode";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});

  // initial user
  useEffect(() => {
    // check for valid token (if so, give persmissions)
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      setAuthToken(localStorage.jwtToken);
      setUser(decoded);

      //check for expired token (if so, lougout)
      if (decoded.exp < Date.now / 1000) {
        logout();
      }
    }
  }, [setUser]);

  // hadling login
  const login = credits => {
    axios
      .post("api/users/login", credits)
      .then(user => {
        const token = user.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        setUser(jwt_decode(token));
      })
      .catch(e => setErrors(e.response.data));
  };

  //handling register
  const register = newUser => {
    axios
      .post("/api/users/register", newUser)
      .then(res => setUser(res.data))
      .catch(e => setErrors(e.response.data));
  };

  // handling logout
  const logout = () => {
    delete localStorage.jwtToken;
    setAuthToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, register, errors, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}
