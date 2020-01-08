import React, { useEffect, useState } from "react";
import axios from "axios";

function PrivProfile(props) {
  const userId = props.match.params.id;
  const [profile, setProfile] = useState();
  useEffect(() => {
    axios
      .get(`/profiles/${userId}`)
      .then(profile => setProfile(profile))
      .catch(e => alert(e.response.data));
  });
  return (
    <div>
      <h1 style={{ fontSize: "120px" }}>Welcome to the public user profile!</h1>
    </div>
  );
}

export default PrivProfile;
