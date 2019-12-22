import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});

  const login = credits => {
    axios
      .post("api/users/login", credits)
      .then(user => setUser(user))
      .catch(e => setErrors(e.response.data));
  };

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
