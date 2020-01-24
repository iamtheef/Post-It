import React from "react";

export default function UpperFooter() {
  return (
    <footer className="upFooter">
      <div>
        VIEW
        <span className="button is-static">
          <i className="fa fa-square" style={{ marginLeft: "10px" }}></i>
        </span>
        <span style={{}}>
          <i
            className="fa fa-bars"
            style={{ marginLeft: "10px", marginTop: "3px" }}
          ></i>
        </span>
      </div>
      <div
        className="vertical-divider"
        style={{ marginLeft: "10vw", marginTop: "-3vh", height: "25px" }}
      ></div>
    </footer>
  );
}
