import React from "react";

export default function PremiumFooter() {
  return (
    <div className="tile prem-footer-background" style={{ marginTop: "2vh" }}>
      <div className="is-vertical is-12">
        <img
          className="prem-footer-img"
          src="https://data.1freewallpapers.com/download/blue-planet-rising-1024x768.jpg"
        ></img>
        <div className="pr">
          <article className="is-child notification">
            <div className="column is-12">
              <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                postIt Premium
              </p>
              <p style={{ fontSize: "12px" }}>
                Get the full postIt experience with postIt premium!
              </p>
              >
            </div>
            <button className="button" style={{ backgroundColor: "#ff4500" }}>
              <p
                style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
              >
                TRY NOW
              </p>
            </button>
          </article>
        </div>
      </div>
    </div>
  );
}
