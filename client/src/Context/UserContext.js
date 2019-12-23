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
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      setUser(jwt_decode(localStorage.jwtToken));
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
        setUser(jwt_decode(user.data.token));
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

  return (
    <UserContext.Provider value={{ user, login, register, errors }}>
      {props.children}
    </UserContext.Provider>
  );
}
