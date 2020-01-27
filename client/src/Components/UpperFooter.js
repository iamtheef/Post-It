import React from "react";

export default function UpperFooter() {
  return (
    <footer className="upFooter">
      <div>
        VIEW
        <span className="button is-static" style={{ marginTop: "-3px" }}>
          <i className="fa fa-square" style={{ marginLeft: "10px" }}></i>
        </span>
        <span>
          <i
            className="fa fa-bars"
            style={{ marginLeft: "10px", marginTop: "3px" }}
          ></i>
        </span>
      </div>
      <div
        className="vertical-divider"
        style={{ marginLeft: "10vw", marginTop: "-3.5vh" }}
      ></div>
    </footer>
  );
}
