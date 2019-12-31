import axios from "axios";

const setAuthToken = token => {
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];

  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  }
};

export default setAuthToken;
