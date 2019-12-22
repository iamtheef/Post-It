import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = credits => {
    axios
      .post("api/users/login", credits)
      .then(user => setUser(user))
      .catch(e => setError(e.response.data));
  };

  return (
    <UserContext.Provider value={{ user, login, error }}>
      {props.children}
    </UserContext.Provider>
  );
}
