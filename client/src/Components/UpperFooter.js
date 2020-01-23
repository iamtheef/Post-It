import React from "react";

export default function UpperFooter() {
  return (
    <footer className="upFooter">
      <div>
        VIEW:
        <span className=" is-static">
          <i
            className="fa fa-square"
            aria-hidden="true"
            style={{ marginLeft: "10px" }}
          ></i>
        </span>
        <span className="button is-static">
          <i
            className="fa fa-bars"
            aria-hidden="true"
            style={{ marginLeft: "10px" }}
          ></i>
        </span>
      </div>
    </footer>
  );
}
