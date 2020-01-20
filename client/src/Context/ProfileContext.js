import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
//
//
//
export const ProfileContext = createContext();
export function ProfileProvider(props) {
  //nessecary hooks
  const [upvoteSession, setUpvoteSession] = useState([]);
  const [downvoteSession, setDownvoteSession] = useState([]);
  const [profile, setProfile] = useState();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setProfile([]);
      setUpvoteSession([]);
      setDownvoteSession([]);
    }
  }, [setUser]);

  const initializeProfile = () => {
    axios
      .get("/api/profile/")
      .then(profile => {
        setProfile(profile.data);
        console.log(profile.data.upvoted);
        setUpvoteSession(profile.data.upvoted);
        setDownvoteSession(profile.data.downvoted);
      })
      .catch(e => {
        setProfile(e.response);
      });

    return profile;
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        initializeProfile,
        upvoteSession,
        setUpvoteSession,

        downvoteSession,
        setDownvoteSession
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
}
