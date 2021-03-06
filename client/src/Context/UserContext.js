import React, { createContext, useState } from "react";
import setAuthToken from "../AxiosRequestAuthUtil";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState();
  const [errors, setErrors] = useState({});
  const [upvoteSession, setUpvoteSession] = useState([]);
  const [downvoteSession, setDownvoteSession] = useState([]);
  const [profile, setProfile] = useState();

  // initial user
  const initializeUser = () => {
    // check for valid token (if so, give persmissions)
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      setUser(decoded);
      initializeProfile(decoded);

      //check for expired token (if so, lougout)
      if (decoded.exp < Date.now() / 1000) {
        logout();
      }
    }
  };

  // hadling login
  const login = credits => {
    axios
      .post("/api/users/login", credits)
      .then(user => {
        const token = user.data.token;
        localStorage.setItem("jwtToken", token);
        const decoded = jwt_decode(localStorage.jwtToken);
        setAuthToken(localStorage.jwtToken);
        setUser(decoded);
        initializeProfile(decoded);
      })
      .catch(e => setErrors(e.response.data));
  };

  //handling register
  const register = newUser => {
    axios
      .post("/api/users/register", newUser)
      .then(user => {
        const token = user.data.token;
        localStorage.setItem("jwtToken", token);
        const decoded = jwt_decode(localStorage.jwtToken);
        setAuthToken(localStorage.jwtToken);
        setUser(decoded);
        initializeProfile(decoded);
      })
      .catch(e => setErrors(e.response.data));
  };

  // handling logout
  const logout = () => {
    delete localStorage.jwtToken;
    setAuthToken(null);
    setUser();
    initializeProfile();
  };

  const initializeProfile = user => {
    if (user) {
      axios
        .get("/api/profile/")
        .then(profile => {
          setProfile(profile.data);
          setUpvoteSession(profile.data.upvoted);
          setDownvoteSession(profile.data.downvoted);
        })
        .catch(e => {
          setProfile(e.response);
        });
    } else {
      setProfile([]);
      setUpvoteSession([]);
      setDownvoteSession([]);
    }
  };

  const isUpvoted = id => {
    return upvoteSession.includes(id);
  };
  const isDownvoted = id => {
    return downvoteSession.includes(id);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        errors,
        logout,
        initializeUser,
        isUpvoted,
        isDownvoted,

        profile,
        setProfile,
        initializeProfile,
        upvoteSession,
        setUpvoteSession,
        downvoteSession,
        setDownvoteSession
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
