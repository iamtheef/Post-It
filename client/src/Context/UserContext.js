import React, { createContext, useState } from "react";
import axios from "axios";

export const login = credits => {
  console.log(credits);
  axios
    .post("api/users/login", credits)
    .then(user => console.log(user))
    .catch(e => this.setState({ errors: e.response.data }));
};

export const UserContext = createContext(null);

export function UserProvider(props) {
  return (
    <UserContext.Provider value={login}>{props.children}</UserContext.Provider>
  );
}
